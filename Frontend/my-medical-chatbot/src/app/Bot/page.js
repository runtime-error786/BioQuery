"use client"
import { useDispatch, useSelector } from 'react-redux';
import React from "react";
export default function Bot() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Chat);
  return (
   <>
   <h1>Hello I am from chatbot{data}</h1>
   </>
  );
}


