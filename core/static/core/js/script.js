// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script chargé avec succès !');
    
    // Initialiser les fonctionnalités
    initProductCards();
    initSearchFunctionality();
    initAnimations();
    initLoadingStates();
});

// Initialiser les cartes de produits
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Ajouter un effet de clic
        card.addEventListener('click', function(e) {
            // Ne pas déclencher si on clique sur un bouton
            if (e.target.classList.contains('btn')) {
                return;
            }
            
            // Effet de pulsation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Afficher les détails du produit (simulation)
            const productName = this.querySelector('.product-title').textContent;
            showProductDetails(productName);
        });
        
        // Ajouter des événements pour les boutons
        const addToCartBtn = card.querySelector('.btn-primary');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const productName = card.querySelector('.product-title').textContent;
                addToCart(productName);
            });
        }
        
        const detailsBtn = card.querySelector('.btn-secondary');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const productName = card.querySelector('.product-title').textContent;
                showProductDetails(productName);
            });
        }
    });
}

// Fonctionnalité de recherche
function initSearchFunctionality() {
    // Créer la barre de recherche si elle n'existe pas
    const header = document.querySelector('.header');
    if (header && !document.querySelector('.search-container')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div style="margin-top: 20px;">
                <input type="text" id="searchInput" placeholder="Rechercher un produit..." 
                       style="padding: 12px 20px; border: none; border-radius: 25px; width: 300px; font-size: 16px; outline: none;">
            </div>
        `;
        header.appendChild(searchContainer);
        
        // Ajouter l'événement de recherche
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', function() {
            filterProducts(this.value);
        });
    }
}

// Filtrer les produits
function filterProducts(searchTerm) {
    const productCards = document.querySelectorAll('.product-card');
    const searchTermLower = searchTerm.toLowerCase();
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-title').textContent.toLowerCase();
        const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
        
        if (productName.includes(searchTermLower) || productDescription.includes(searchTermLower)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.3s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Afficher un message si aucun produit trouvé
    const visibleProducts = document.querySelectorAll('.product-card[style*="display: block"], .product-card:not([style*="display: none"])');
    showNoResultsMessage(visibleProducts.length === 0 && searchTerm.length > 0);
}

// Afficher le message "aucun résultat"
function showNoResultsMessage(show) {
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (show && !noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message empty-state';
        noResultsMsg.innerHTML = `
            <h2>Aucun produit trouvé</h2>
            <p>Essayez avec d'autres mots-clés</p>
        `;
        document.querySelector('.products-grid').appendChild(noResultsMsg);
    } else if (!show && noResultsMsg) {
        noResultsMsg.remove();
    }
}

// Initialiser les animations
function initAnimations() {
    // Observer les éléments pour les animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les cartes de produits
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialiser les états de chargement
function initLoadingStates() {
    // Simuler un chargement initial
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading';
    loadingSpinner.innerHTML = `
        <div class="spinner"></div>
        <p>Chargement des produits...</p>
    `;
    
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
        productsGrid.style.display = 'none';
        productsGrid.parentNode.insertBefore(loadingSpinner, productsGrid);
        loadingSpinner.style.display = 'block';
        
        // Simuler un délai de chargement
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
            productsGrid.style.display = 'grid';
        }, 1000);
    }
}

// Ajouter au panier (simulation)
function addToCart(productName) {
    // Animation du bouton
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Ajouté !';
    button.style.background = '#28a745';
    
    // Notification
    showNotification(`${productName} ajouté au panier !`, 'success');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

// Afficher les détails du produit (simulation)
function showProductDetails(productName) {
    showNotification(`Détails de ${productName}`, 'info');
    // Ici vous pourriez ouvrir une modal ou rediriger vers une page de détails
}

// Afficher des notifications
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Ajouter des styles CSS pour les animations de notification
const notificationStyles = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;

// Injecter les styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Fonction utilitaire pour formater les prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Fonction pour trier les produits
function sortProducts(criteria) {
    const productsGrid = document.querySelector('.products-grid');
    const productCards = Array.from(productsGrid.children);
    
    productCards.sort((a, b) => {
        if (criteria === 'price') {
            const priceA = parseFloat(a.querySelector('.product-price').textContent.replace(/[^\d.,]/g, '').replace(',', '.'));
            const priceB = parseFloat(b.querySelector('.product-price').textContent.replace(/[^\d.,]/g, '').replace(',', '.'));
            return priceA - priceB;
        } else if (criteria === 'name') {
            const nameA = a.querySelector('.product-title').textContent.toLowerCase();
            const nameB = b.querySelector('.product-title').textContent.toLowerCase();
            return nameA.localeCompare(nameB);
        }
    });
    
    // Réorganiser les éléments dans le DOM
    productCards.forEach(card => productsGrid.appendChild(card));
}

// Exposer les fonctions globalement pour utilisation dans la console
window.productUtils = {
    sortProducts,
    formatPrice,
    addToCart,
    showProductDetails
}; 