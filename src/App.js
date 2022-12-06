import { collection, getDocs, query, doc, deleteDoc, where, onSnapshot, } from "firebase/firestore";
//import {getDoc, addDoc, updateDoc, setDoc, increment } from "firebase/firestore";
import React, { useEffect,useState } from 'react';
import firebase, { db } from './componente/firebase';
import AppForm from './componente/AppForm';
import { toast } from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { async } from "@firebase/util";

function App() {  
  ////////////////////////////////////////////////////////////////////////
  ////////// READ - fnRead - LECTURA BD //////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  const [idActual, setIdActual] = useState("");     //Para CREAR y UPDATE
  const [docsBD, setDocsBD] = useState([]);         //Para lectura a BD
  const [orden, setOrden] = useState(0);            //Para número - falla
  const i = 1;                                      //Para número - falla
  //console.log(docsBD);  //Comentar sino genera bucle infinito useEffect

  ////////// READ con onSnapshot - Actualiza en TIEMPPO REAL /////////////
  useEffect( () => {
    //const xColeccionConQuery = query(collection(db, "persona"));   //Sin filtro
    const xColeccionConQuery = query(collection(db, "favoritos"), where("url", "!=", ""));
    const unsubscribe = onSnapshot(xColeccionConQuery, (xDatosBD) => {
      const xDoc = [];
      xDatosBD.forEach((doc) => {
        //xDoc.push(doc.data().nombre);             //Datos como "texto" en array
        //xDoc.push(doc.id);                        //Datos "ID" como "texto" en array
        //xDoc.push(doc.data());                    //Datos como "Objeto"
        //xDoc.push({id: doc.id});                  //Datos "ID" como "objeto" con indice "id"
        xDoc.push({id: doc.id, ...doc.data()});     //Datos "union" de "objetos"
      });
      //console.log("Resultado...: ", xDoc.join(", ")); //Comentar sino bucle infinito
      setDocsBD(xDoc);
      //console.log(docsBD);                          //Error lectura debe ser afuera
    });
    //unsubscribe();         //Sólo si función estuviera fuera sino es error llamarlo
  }, [idActual]);

/*
  ////////// READ SIN onSnapshot - NO Actualiza en TIEMPPO REAL //////////
  const fnRead = async () => {
    //const xColeccionConQuery = query(collection(db, "persona"));   //Sin filtro
    const xColeccionConQuery = query(collection(db, "persona"), where("nombre", "!=", ""));
    const xDatosBD = await getDocs(xColeccionConQuery);
    const xDoc = [];
    xDatosBD.forEach((doc) => {
      //xDoc.push(doc.data().nombre);             //Datos como "texto" en array
      //xDoc.push(doc.id);                        //Datos "ID" como "texto" en array
      //xDoc.push(doc.data());                    //Datos como "Objeto"
      //xDoc.push({id: doc.id});                  //Datos "ID" como "objeto" con indice "id"
      xDoc.push({id: doc.id, ...doc.data()});     //Datos "union" de "objetos"
    });
    console.log("Resultado...: ", xDoc.join(", "));
    setDocsBD(xDoc);
    //console.log(docsBD);                        //Error lectura debe ser afuera
  } 

  useEffect( () => {
    fnRead(); 
  }, [idActual])
*/

  ///////////////////////////////////////////////////////////////
  ////////////////////DELETE - fnDelete - Eliminar///////////////
  ///////////////////////////////////////////////////////////////
  const fnDelete = async (xId) => {
    //console.log(xId);
    if(window.confirm("CONFIRME PARA ELIMINAR")){
      await deleteDoc(doc(db, 'favoritos', xId));
      toast("Documento eliminado con éxito", {
        type:'error',
        autoClose: 2000
      })
      //console.log("Se elimino..."+xId);
    }
  }

  return (
    <div className="container text-center">
      <div className="card bs-secondary p-3 mt-3">

        <ToastContainer />

        <div className="col-md-12 p-2">
          <div className="card mb-1">
            <h1> (App.js)</h1>
          </div>
        </div>

        <div className="col-md-12 p-2">
          <AppForm {...{idActual, setIdActual}} />
        </div>
        
        <div className="col-md-12 p-2">
          {
            docsBD.map( (p) => 
              <div className="card mb-1" key={p.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h4>N.{i} - {p.url} </h4>
                    <div>
                      
                      <i className="material-icons text-warning"
                        onClick={() => setIdActual(p.id)}>create</i>
                        ...
                      
                      <i className="material-icons text-danger"
                        onClick={() => fnDelete(p.id)}>close</i>
                    </div>
                  </div>
                  <div className="d-flex justify-content">
                    <span>Nombre: {p.nombre} </span>...  
                    <a href="#"> Descripción: {p.descripcion}</a>
                  </div>
                </div>
              </div>
            ) 
          }
        </div>
        
      </div>
    </div>
  );
}

export default App;