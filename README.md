## to create secret key via kubernetes:
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=someSecret

# Modules:
1) client
2) auth
3) common


###NATS port forwarding from the pod to localhost
kubectl port-forward nats-depl-7fb96496cc-8tcxk 4222:4222