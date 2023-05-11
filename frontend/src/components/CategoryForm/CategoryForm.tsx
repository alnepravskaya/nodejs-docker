import {SyntheticEvent, useState} from "react";

const CategoryForm = ({onSubmit}: {onSubmit: (value: string) => void}) => {
 const [value, setValue] = useState("");

 const submitForm = (e: SyntheticEvent) => {
     e.preventDefault();
     onSubmit(value);
     setValue("")
 }

  return <form onSubmit={submitForm}>
      <input type="text" value={value} onChange={(e)=> setValue(e.target.value)}/>
      <button type="submit">Add new category</button>
  </form>
}

export default CategoryForm;
