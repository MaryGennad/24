import { useEffect } from "react";
import { useState } from "react";
import './App.css'
import { Route, Routes, useParams } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} /> */}
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
}

function Home() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    let res = await fetch(process.env.REACT_APP_API + '/api/product')
    let resJson = await res.json()
    setProducts(resJson)
  }

  async function onChange(paramName, value, productIndex) {
    let newProducts = [...products]
    newProducts[productIndex][paramName] = value
    setProducts(newProducts)
  }

  return (

    <div>
      {products.map((product, productIndex) => {
        return (
          <div key={productIndex}>
            {/*HEADER*/}
            <div className="product" >
              <input
                className="h1"
                value={product.name}
                onChange={(e) => {
                  let value = e.target.value
                  onChange('name', value, productIndex)
                }}
              />
            </div>
            {/*IMAGE*/}
            <div>
              <img className="imgs" src={product.image} />
              Картинку можно поменять тут :
              <input className="product"
                value={product.image}
                onChange={(e) => {
                  let value = e.target.value
                  onChange('image', value, productIndex)
                }}
              />
            </div>
            <br></br>
            {/* INGREDIENTS */}
            <div className="product">{
              product.ingreS?.map((ingredient, ingredientIndex) => {
                return (
                  <div className="product ingredient">
                    <input value={ingredient}
                      key={ingredientIndex}
                      onChange={(e) => {
                        let value = e.target.value
                        let newProducts = [...products]
                        // newProducts[productIndex][paramName] = value                                         
                        newProducts[productIndex].ingreS[ingredientIndex] = value
                        setProducts(newProducts)
                      }} />
                    <button
                      className="button"
                      onClick={() => {
                        // let value = e.target.value
                        let newProducts = [...products]
                        newProducts[productIndex].ingreS.splice(ingredientIndex, 1)
                        setProducts(newProducts)
                      }}
                    >Удалить</button>
                  </div>
                )
              }
              )}
              <br></br>
              <button
                className="button"
                onClick={(e) => {
                  let newProducts = [...products]
                  newProducts[productIndex].ingreS.push('Новый ингредиент')
                  setProducts(newProducts)
                }}
              >Добавить ингредиент
              </button>
            </div>
            <br></br>
            <br></br>
            {/*DESCRIPTION*/}
            <div className="product">
              <textarea value={product.description} rows="5"
                onChange={(e) => {
                  let value = e.target.value
                  onChange('description', value, productIndex)
                }}
              >
              </textarea>
            </div>
            <div className="save">
              <button className="button"
                onClick={async () => {
                  let res = await fetch(process.env.REACT_APP_API + '/api/product',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
                      body: JSON.stringify(product)
                    })
                  let resJson = await res.json()
                  console.log(resJson);
                  onChange('_id', resJson['id'], productIndex)
                }}
              >
                Сохранить
              </button>
            </div>
          </div>
        )
      })}
      <div className="buttonProducts">
        {/* добавить блюдо */}
        <button className="button"
          onClick={(e) => {
            let newProducts = [...products]
            newProducts.push({

              name: "Новое блюдо",
              image: "https://chefrestoran.ru/wp-content/uploads/2018/08/shutterstock_413329057.jpg",
              ingreS: [
                "Ингредиент 1",
                "Ингредиент 2",
              ],
              description: "Описание приготовления",
              "__v": 0

            })
            setProducts(newProducts)
          }}
        >
          Добавить блюдо
        </button>
        {/* удалить блюдо */}
        {/* <button className="button"
          onClick={async () => {
            // let value = e.target.value
            let newProducts = [...products]
            let res = await fetch(process.env.REACT_APP_API + '/api/product/delete', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(newProducts[productIndex])
            })
            let resJson = await res.json()
            console.log(resJson);
            newProducts.splice(productIndex, 1)
            setProducts(newProducts)
             }}
        >Удалить блюдо</button> */}
      </div>
    </div>
  );
}

// function About() {
//   return(
//   <h1>About</h1>
//   );
// }

function Product() {
  let { id } = useParams();
  const [product, setProducts] = useState({
    ingreS: []
  })
  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    let res = await fetch(process.env.REACT_APP_API + '/api/product/id/?id=' + id)
    let resJson = await res.json()
    setProducts(resJson);
    console.log(resJson)
  }
  return (
    // <h1>{'Product:' + id}</h1>
    <div>
      {/*HEADER*/}
      <div className="product">
        <p>{product.name}</p>
      </div>
      {/*IMAGE*/}
      <div>
        <img className="imgs" src={product.image} />
      </div>
      <br></br>
      {/* INGREDIENTS */}
      <div className="product">{
        product.ingreS?.map((ingredient, ingredientIndex) => {
          return (
            <div className="product ingredient">
              <input value={ingredient}
                key={ingredientIndex}
              />
            </div>
          )
        }
        )}
        <br></br>
      </div>
      <br></br>
      <br></br>
      {/*DESCRIPTION*/}
      <div className="product">
        {product.description}
      </div>
      </div>
      )
}
      export default App;
