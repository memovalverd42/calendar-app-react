import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from "date-fns/locale";
import { useCalendarStore, useUiStore } from "../../hooks";
import { IEvent } from "..";

registerLocale('es', es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const initialFormState: IEvent = {
  id: "",
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "fafafa",
  user: {
    id: '',
    name: ''
  }
};

export const CustomCalendarModal = () => {

  const { activeEvent, startSavingEvent } = useCalendarStore();
  const { closeDateModal, isDateModalOpen } = useUiStore();
  const [formValues, setFormValues] = useState<IEvent>(initialFormState);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const titleClass = useMemo(() => {
    if( !formSubmitted ) return '';
    return ( formValues.title.length > 0 )  
      ? '' 
      : 'is-invalid';
  }, [ formValues.title, formSubmitted ]);

  useEffect(() => {
    if( activeEvent !== null ) {
      setFormValues({ ...activeEvent });
    }
  }, [ activeEvent ]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  }

  const onDateChange = ( date: Date | null, changin: "start" | "end" ) => {
    setFormValues({
      ...formValues,
      [changin]: date
    });
  }

  const onSubmit = async( e: ChangeEvent<HTMLFormElement> ) => {
    e.preventDefault();
    setFormSubmitted( true );
    
    const difference = differenceInSeconds( formValues.end, formValues.start );
    if ( isNaN( difference ) || difference < 0 ) {
      Swal.fire('Fechas incorrectas', 'Fecha fin debe ser mayor a la fecha de inicio', 'error');
      return;
    }
    if ( formValues.title.length <= 0 ) return;
    
    await startSavingEvent( formValues );
    closeDateModal();
    setFormSubmitted( false );
  }

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={ closeDateModal }
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      contentLabel="Example Modal"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={ onSubmit }>
        <div className="form-group mb-2">
          <label className="" >Fecha y hora inicio</label>
          <DatePicker  
            className="form-control"
            selected={ formValues.start }
            onChange={ (date) => onDateChange( date, 'start' ) }
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
            />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={ formValues.start }  
            className="form-control"
            selected={ formValues.end }
            onChange={ (date) => onDateChange( date, 'end' ) }
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={ `form-control ${ titleClass }` }
            placeholder="Título del evento"
            name="title"
            autoComplete="off"

            value={ formValues.title }
            onChange={ onInputChange }
            />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"

            value={ formValues.notes }
            onChange={ onInputChange }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
