import React,{useState,useEffect} from 'react'
import "../styles/Catalog.css"
const getUserFromToken=()=>{
    const token=localStorage.getItem("token");
    if(!token) return null;
    try{
        const payload=JSON.parse(atob(token.split(".")[1]));
        return payload.email ||null;
    }catch(error){
        console.error("Invalid token:",error);
        return null;
    }

};
const Bags = () => {
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const[message,setMessage]=useState("");
    const userEmail=getUserFromToken();
    useEffect(()=>{
        fetch("http://localhost:7700/api/Catalog/Bags",{
            headers:{
                Authorization:`Bearer  ${localStorage.getItem("token")}`,
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            if(data.error){
                setError(data.error);
            }else{
                setProducts(data.products);
            }
            setLoading(false);
        })
        .catch((err)=>{
            setError("Failed to fetch products");
            setLoading(false);
        });
},[]);
const addToCart=(product)=>{
    if(!userEmail){
        setMessage("Please log in to add items to the cart");
        return;
    }
    if(!product.productID){
        console.error("Error:Product ID is missing",product);
        setMessage("Failed to add item to cart");
        return;
    }
const requestData={
    productID:product.productID,
    email:userEmail,
    quantity:1,
    productName:product.productName,
    price:product.Price,
    productImagePath:product.productImagePath,
};
console.log("Sending request:",requestData);
fetch("http://localhost:7700/api/ShoppingCart/addtoCart",{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem("token")}`,
    },
    body:JSON.stringify([requestData]),
})
.then((res)=>res.json())
.then((data)=>{
    if(data.message){
        setMessage("Item added to cart!");
        setTimeout(()=>setMessage(""),3000);
    }else{
        setMessage("Failed to add item to cart");
    }
})
.catch((error)=>console.error("Error:",error));
}

if (loading) {
    return (
      <div className="dotArea">
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="CatalogArea">
      <h2>Bag Catalog</h2>

      {message && <div className="message-box">{message}</div>} 

      <div className="catalog">
        {products.map((product) => (
          <div key={product.productID} className="product-card">
            <img
              src={`http://localhost:7700${product.productImagePath}`}
              alt={product.productName}
              className="product-image"
            />
            <div>
              <p>{product.productName}</p>
              <p>Price: Ksh.{product.Price}</p>
              <button onClick={() => addToCart(product)}>ADD TO CART</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bags;