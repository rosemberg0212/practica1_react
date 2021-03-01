import React, {Fragment, useState} from 'react';
import shortid from 'shortid';

const Formulario = ({crearCita})=>{
    
    //crear State de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    //state para validacion
    const [error, actualizarError] = useState(false)

    //funcion que se ejecuta cuando el usuario escribe en un input
    const actualizarState = (e)=>{
        actualizarCita({
            ...cita,//hacer una copia de todo lo que tiene cita
            [e.target.name]: e.target.value //reescribir y optener el valor del input donde se encuentre
        })
    }

    //Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //cuando se preciona el boton 
    const submitCita = (e)=>{
        e.preventDefault();//prevenir accion por default

        //validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' ||
          sintomas.trim() === '' ){
          actualizarError(true);
          return; //para que no se continue ejecutando el codigo
        }

        //eliminar mensaje de validacion
        actualizarError(false);

        //asignar un ID
        cita.id = shortid.generate();
        
        //crear la cita 
        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
          mascota: '',
          propietario:'',
          fecha:'',
          hora:'',
          sintomas:''
        })
    }

    return (
       <Fragment>
           <h2>Crear Cita</h2>

           {error ? <p className="alerta-error">Todos los campos son obligatorios</p>: null}

           <form
              onSubmit={submitCita}
           >
               <label>Nombre mascota</label>
               <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={actualizarState}
                    value={mascota}//reiniciar el formulario
               />

                <label>Nombre Dueño</label>
               <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
               />

                <label>Fecha</label>
               <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
               />

                <label>Hora</label>
               <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
               />

                <label>Sintomas</label>
               <textarea 
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
               >
               </textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
               
           </form>
       </Fragment>
    );
}

export default Formulario;