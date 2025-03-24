import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: 'Fernando',
        notes: 'Herrera',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'border-red-500';

    }, [formValues.title, formSubmitted])

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent])

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    };

    const onCloseModal = () => {
        closeDateModal();
    };

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        if (formValues.title.length <= 0) return;

        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmitted(false);

    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <div className="p-4">
                <h1 className="text-center font-medium text-2xl mb-4">Crear un nuevo evento</h1>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col mb-2">
                        <label className="text-sm font-medium text-gray-500">Fecha y hora de inicio</label>
                        <DatePicker
                            className="w-full border-2 rounded-md p-2 mt-1 border-gray-100 focus:border-blue-500 focus:outline-none"
                            onChange={(event) => onDateChanged(event, "start")}
                            selected={formValues.start}
                            dateFormat="Pp"
                            showTimeSelect
                            locale="es"
                            timeCaption="Hora"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="text-sm font-medium text-gray-500">Fecha y hora de fin</label>
                        <DatePicker
                            minDate={formValues.start}
                            className="w-full border-2 rounded-md p-2 mt-1 border-gray-100 focus:border-blue-500 focus:outline-none"
                            onChange={(event) => onDateChanged(event, "end")}
                            selected={formValues.end}
                            dateFormat="Pp"
                            showTimeSelect
                            locale="es"
                            timeCaption="Hora"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="text-sm font-medium text-gray-500">Título y notas</label>
                        <input
                            type="text"
                            name="title"
                            autoComplete="off"
                            value={formValues.title}
                            onChange={onInputChanged}
                            placeholder="Título del evento"
                            className={`w-full border-2 rounded-md p-2 mt-1 border-gray-100 focus:border-blue-500 focus:outline-none ${titleClass}`}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="text-sm font-medium text-gray-500">Descripción</label>
                        <textarea
                            type="text"
                            name="notes"
                            value={formValues.notes}
                            onChange={onInputChanged}
                            placeholder="Notas"
                            className="w-full border-2 rounded-md p-2 mt-1 border-gray-100 focus:border-blue-500 focus:outline-none"
                            rows="5"
                        ></textarea>
                    </div>
                    <div>
                        <button className="bg-blue-500 text-white text-lg rounded-sm p-2 w-full">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>

        </Modal>
    )
}
