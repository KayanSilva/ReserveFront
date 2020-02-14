export function domInject(seletor: string) {
    return function (target: any, key: string, ) {

        let elemento: JQuery;

        const getter = function () {

            if (!elemento) {
                console.log(`Buscando ${seletor} para injetar em ${key}`)
                elemento = $(elemento);
            }

            return elemento;
        }

        Object.defineProperty(target, key, { get: getter });
    }
}