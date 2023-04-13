import React, { useState } from "react";
import style from "./styles.module.css";

type Props = {
  onSearch: (param: string) => void;
};

const SearchForm: React.FC<Props> = ({ onSearch }: Props) => {
  const [fields, setFields] = useState({
    address: "",
  });

  const handleInputChange = (event: any) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleClick = () => {
    const params = [];

    for (const [name, value] of Object.entries(fields)) {
      if (value != "") params.push(`${name}=${encodeURIComponent(value)}`);
    }

    onSearch(params.join("&"));
  };

  return (
    <div className={style.wrapper}>
      <span>{"Structure number and street name: "}</span>
      <input onChange={handleInputChange} name="address" />
      <br />
      <button type="submit" onClick={handleClick}>
        Search
      </button>
    </div>
  );
};

export default SearchForm;
