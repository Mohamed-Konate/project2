from django.core.management.base import BaseCommand
from core.models import Product


class Command(BaseCommand):
    help = 'Crée des produits de test pour le catalogue'

    def handle(self, *args, **options):
        # Supprimer les produits existants
        Product.objects.all().delete()
        
        # Créer des produits de test
        products_data = [
            {
                'name': 'Laptop Gaming Pro',
                'description': 'Ordinateur portable haute performance pour les jeux vidéo avec écran 15.6" et carte graphique RTX 4060.',
                'price': 1299.99
            },
            {
                'name': 'Smartphone Galaxy S24',
                'description': 'Smartphone Android dernier cri avec appareil photo 108MP et écran AMOLED 6.2".',
                'price': 899.99
            },
            {
                'name': 'Tablette iPad Air',
                'description': 'Tablette Apple avec puce M2, écran 10.9" et support Apple Pencil pour la créativité.',
                'price': 749.99
            },
            {
                'name': 'Casque Audio Sony WH-1000XM5',
                'description': 'Casque sans fil avec réduction de bruit active et qualité audio exceptionnelle.',
                'price': 349.99
            },
            {
                'name': 'Montre Connectée Apple Watch',
                'description': 'Montre intelligente avec suivi de santé, GPS intégré et notifications en temps réel.',
                'price': 399.99
            },
            {
                'name': 'Caméra GoPro Hero 11',
                'description': 'Caméra d\'action 4K avec stabilisation électronique pour capturer vos aventures.',
                'price': 449.99
            }
        ]
        
        for product_data in products_data:
            Product.objects.create(**product_data)
        
        self.stdout.write(
            self.style.SUCCESS(f'✅ {len(products_data)} produits de test créés avec succès !')
        ) 