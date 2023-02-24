const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const fetchApirocket = async (myQuery) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer pPksKJasQwmrNgTpfaef3oIeahExmmNrBTJcvqaXguPGaiecgvb6L_Cbpo0pBJcb'
        },
        body: JSON.stringify({query: myQuery})
    }
    const response = await fetch('https://graphql.apirocket.io/', options).then(r => r.json())
    return response
}

async function fetchCategorias() {

    let query = `query MyQuery {
        AllCategorias {
          id
          imagen {
            url
          }
          nombre
          productos {
            descripcion
            id
            imagen {
              url
            }
            nombre
            precio
            precioOferta
            tallas
          }
        }
      }
      `;

    const categories = await fetchApirocket(query)
    return categories.data['AllCategorias']
}

// TODO: Programar la función para cargar productos
async function fetchProductos() {
  let query = `query MyQuery {
    AllProductos {
      descripcion
      id
      nombre
      imagen {
        url
      }
      precio
      precioOferta
      tallas
      galeria {
        url
      }
      categorias {
        nombre
        imagen {
          url
        }
        id
      }
    }
  }
  `
    const categories = await fetchApirocket(query)
    return categories.data['AllProductos']
}

function guardarDataEnDisco(name, jsonData) {
    const filePath = path.join(__dirname, `../src/html/_data/${name}`)
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2))
}


(async () => {
    let categorias = await fetchCategorias()
    guardarDataEnDisco('categorias.json', categorias)

    let productos = await fetchProductos()
    guardarDataEnDisco('productos.json', productos)

    let ofertas = await fetchOfertas()
    guardarDataEnDisco('ofertas.json', ofertas)
    // En el package.json incluir un script "data" que ejecute esto
    // Y añadir el script al proceso de build
})()