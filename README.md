# CDA-the-good-corner

# la commande pour démarrer l'application en mode développement
docker compose up --build

# la commande pour démarrer l'application en mode production
docker compose -f docker-compose.prod.yml up --build

# to delete data and seed Database. Provide 4 arguments(numbers) : [nb_categories_seed] [nb_tags_seed] [nb_ads_seed] [nb_users_seed]
cd backend
npm run seed 10 20 30 40
