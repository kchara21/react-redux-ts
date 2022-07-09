import React from "react";

const CarItem = ({ data, deleteOneFromCart,deleteAllFromCart }: any) => {
  let { id, name, price,quantity } = data;
  return (
    <div style={{borderBottom:"thin solid gray"}}>
      <h4>{name}</h4>
      <h5>${price}.00 x {quantity} = ${price*quantity}.00</h5>
      <button onClick={()=>deleteOneFromCart(id)}>Eliminar Uno</button>
      <br />
      <button onClick={()=>deleteAllFromCart(id,true)}>Eliminar Todos</button>
    </div>
  );
};

export default CarItem;
