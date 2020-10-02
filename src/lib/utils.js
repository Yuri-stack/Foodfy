module.exports = {
    
    //timestamp de exemplo : 1167609600000 ou 05/03/1999
    age(timestamp){                      //timestamp é uma cadeia de caracteres denotando a hora ou data que certo evento ocorreu 
    
        const today = new Date()                                //pega a data de hoje
        const birthDate = new Date(timestamp)                   //pega a data de nascimento
    
        //2020 - 1999 = 21
        let age = today.getFullYear() - birthDate.getFullYear() //pega o ano de hoje menos o ano do nascimento 
    
        const month = today.getMonth() - birthDate.getMonth()   //pega o mês atual menos o mês do nascimento       
    
        // verificando se eu já fiz aniversário
        if( month < 0 || month == 0 && today.getDate() <= birthDate.getDate()){
            age = age - 1
        }
    
        return age
    
        /*           Mês
                    Atual
    
            Mês : 3 - 4 = - 1   ainda ñ fiz aniversario
            Mês : 3 - 3 =   0   ainda ñ fiz aniversario 
            Mês : 3 - 2 =   1   já fiz aniversario
    
                     Dia
                    Atual
    
            Dia : 5 - 6 = - 1   ainda ñ fiz aniversario
            Dia : 5 - 5 =   0   ainda ñ fiz aniversario
            Dia : 5 - 4 =   1   já fiz aniversario
    
            Quando o mês e o dia são positivos em relação a data de nascimento da pessoa
                significa que ela fez aniverásio, caso contrário subtraimos 1 da conta entre
                ano de nasc. e ano atual.
        */
    },

    date(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()                      //pegando o ano de forma universal, usando o UTC, do timestamp
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)    //pegando o mês ( +1 pois o mês vai de 0 a 11 )
        const day = `0${date.getUTCDate()}`.slice(-2)           //pegando o dia de forma universal, usando o UTC, do timestamp
        
        /*
            No dia e no mês nós add o 0, caso a string retorne um número com um dígito, 
            como o 2, é add 0 na frente (02). O slice(-2) corta os últimos dois digitos
            da string (02), mas caso o número retornado pela string tenha dois dígitos,
            como o 12, é add o 0 (012), e o slice(-2) só pega os últimos dois dígitos, que é
            o 12.
        */
        
        /* Retornando um objeto com várias informações para tratar caso seja necessario do backend */
        return {
            day, month, year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    }
}