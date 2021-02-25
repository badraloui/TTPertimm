// Capture des arguments d'exécution
function getValue(){
    let input = process.argv.slice(2)
    const output = input[0].split(",")
    return output
}


// Je vérifie si le tableau est rempli que de 0 et de 1 
function isValid(tab){
    let value = true
    for (let index=0; index<tab.length; index++){
        // Une fois une valeur est différente de '0' et de '1' je quitte et je renvoie un message (Cf : la fonction main)
        if (tab[index] !== '0' && tab[index] !== '1') {
            value = false
            break
        }
    }
    return value
}

// Fonction permettant de retourner le liste des indices des zeros dans un tableau
// Dans cette version, cette fonction ne serait utilisée que pour trouver les indices des '0'
function allZeros(tab, element){
    let list = []
    let idx = tab.indexOf(element)
    while (idx !== -1){
        list.push(idx)
        idx = tab.indexOf(element, idx+1)
    }
    return list
}

// Je cherche la plus longue chaine constitué de 1 dans un tableau de 0 et de 1
// Idée  :
// Partir d'un tableau constitué d'indices de zéros (exp : [2,4,5] avec la taille de la chaine binaire = 6)
// Encadrer le tableau (Dans l'exp : [0,2,4,5,6]) afin de le parcourir et construire son tableau complémentaire qui va représenter les indices des 1 
// Le tableau résultant de notre exmple est [[0,1],[3],[6,7]]
function longestOnes(tab){
    let list_zeros = allZeros(tab, '0')
    let tmp , final = [] , a = 0 , final_list = []
    // Afin d'encadrer le liste final : j'ajoute un 0 au début et la taile à la fin (S'ils n'existent pas deja)
    if (list_zeros[0] !== 0)  {
        list_zeros.unshift(0)
    }
    if (list_zeros[list_zeros.length-1] !== tab.length){
        list_zeros.push(tab.length)
    }
    if (tab[0] === '1') tmp = [0]
    else tmp = []

    while (a < list_zeros.length){
        for (let i = list_zeros[a]+1; i < list_zeros[a+1]; i++){
            tmp.push(i)
        }
        if (tmp.length !== 0) final.push(tmp)
        a = a + 1
        tmp = []
    }
    // Je calcule la liste contenant les tailles des sous listes construitent auparavant et je renvoie son maximum
    final.forEach(l => final_list.push(l.length))
    return Math.max(...final_list)
}


// J'applique toutes les étapes de l'algorithme dans une fonction main
function main(){
    tab = getValue()
    // Je vérifie si la valeur d'entrée est bien valide 
    if (isValid(tab)) {
        let list_index_zeros = allZeros(tab, '0')
        let list_longest_ones = []
        for (let i=0; i<list_index_zeros.length; i++){
            // À  chaque itération, je change un 0 dans une copie de tab tout en gardant les autres valeurs inchangées.
            let copy_tab = tab.slice()
            copy_tab[list_index_zeros[i]] = '1'
            // Je stocke cette valeur dans une liste (L'indice de cette valeur = l'indice du zéro qui lui correpond)
            list_longest_ones.push(longestOnes(copy_tab))
        }
        // J'inversse les deux listes pour être sur de renvoyer la dernière en cas de plusieurs possibilités.
        list_index_zeros = list_index_zeros.reverse()
        list_longest_ones = list_longest_ones.reverse()
        // Je renvois l'indice du zéro du donne la chaine la plus longue
        let index = list_longest_ones.indexOf(Math.max(...list_longest_ones))
        console.log("\nBonjour, Vous devriez changer la valeur du '0' à la position "+list_index_zeros[index]+".")
        console.log("Au revoir !\n")
    } else {
        console.log("\nAttention.. Veuillez entrer une seule suite de valeur binaire séparés par des virgules !\n")
    }
}

main()






