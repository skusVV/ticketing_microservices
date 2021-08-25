## to create secret key via kubernetes:
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=someSecret

# Modules:
1) client
2) auth
3) common
