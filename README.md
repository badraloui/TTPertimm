# Exercice2 

## Étapes de l'algorithme adopté

1. Je construit une liste contenant les indices de tous les zéros dans la chaîne binaire.
2. Sur une copie de cette chaîne, je permute les '0', un par un, en '1' et je calcule à chaque étape la plus longue chaîne construite que des '1' dans la liste résultante.
3. Je stocke cette valeur dans un tableau que je vais parcourir à la fin pour en tirer le maximum.
4. L'indice de ce maximum coïncide avec l'indice du 0 qu'il faut changer.

__Cet algorithme est implémenté en deux versions__
