
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

// Fonction permettant de retourner le liste des index d'un élément dans un tableau
// Dans cette version, cette fonction serait utilisée pour trouver les indices des '0' et les indices des '1'
function all(tab, element){
    let list = []
    let idx = tab.indexOf(element)
    while (idx !== -1){
        list.push(idx)
        idx = tab.indexOf(element, idx+1)
    }
    return list
}

// Rassemble une liste en sous-listes de valeurs successives  {Exp : [0,1,3,5,6,7] => [[0,1],[3],[5,6,7]] }
function normalize(tab){
    let tmp = [tab[0]], list_normalized = []
    for (let i=0; i<tab.length; i++){
        if(tab[i] === tab[i+1]-1){
            tmp.push(tab[i+1])
        } else {
            list_normalized.push(tmp)
            tmp = [tab[i+1]]
        }
    }
    return list_normalized
}

// Une deuxième version (plus simple) de la fonction longestOnes 
// Idée : Construire le tableau des indices de '1', le normaliser et renvoyer la taille de la sous-liste la plus longue
function longestOnes_v2(tab){
    // Je cherche les indices de tout les 1
    let list_ones = all(tab,'1')
    // Je normalize pour avoir les 1 qui forment une chaine 
    list_ones = normalize(list_ones)
    let final_list = []
    //Je cherche la plus longue chaine de 1
    list_ones.forEach(l => final_list.push(l.length))
    return Math.max(...final_list)
}

// La fonction main représente le cœur de l'algorithme 
function main(){
    let input = process.argv.slice(2)
    const tab = input[0].split(",")
    if (isValid(tab)) {
        let list_index_zeros = all(tab, '0')
        let list_longest_ones = []
        for (let i=0; i<list_index_zeros.length; i++){
            let copy_tab = tab.slice()
            copy_tab[list_index_zeros[i]] = '1'
            list_longest_ones.push(longestOnes_v2(copy_tab))
        }
        // J'inversse les deux liste pour être sur de renvoyer le dernière en cas de plusieurs possibilité
        list_index_zeros = list_index_zeros.reverse()
        list_longest_ones = list_longest_ones.reverse()
        let index = list_longest_ones.indexOf(Math.max(...list_longest_ones))
        console.log("\n[+] Veuillez permuter en '1' le '0' à la position : "+list_index_zeros[index]+"\n")
    } else {
        console.log("\n[+] Attention.. Veuillez entrer une seule suite de valeur binaire séparés par des virgules !\n")
    }
}

main()


