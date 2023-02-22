import React, { useState, useEffect } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Apiurl } from '../Apis/Apis';
import { Navar } from '../Home/Nav';
import { Modal, ButtonToolbar, Button, Placeholder, Form } from 'rsuite';
const Swal = require('sweetalert2');

export const Courses = () => {

    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState();
    const handleOpen = value => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const [Data, setData] = useState([]);
    const [coursesSeleccionado, setCoursesSeleccionado] = useState({
        name: '',
        category: '',
        instructor: '',
        topics: '',
        modality: '',
        availability: ''
    })


    const handleChange = e => {
        const { name, value } = e.target;
        setCoursesSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(coursesSeleccionado);
    }

    const clientGet = () => {
        axios({
            method: 'get',
            url: Apiurl + 'courses'
        })
            .then(function (response) {
                setData(response.data)
                console.log(response.data)
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPost = () => {
        axios.post(Apiurl + 'courses', coursesSeleccionado)
            .then(response => {
                setData(Data.concat(response.data))
                open();
                alertaGuardar();
            })
    }

    const ClientDelete = (row) => {
        Swal.fire({
            title: '¿Esta seguro que desea eliminar el registro?',
            text: "Se eliminara permanentemente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: 'delete',
                    url: Apiurl + 'courses/' + row.id
                })
                    .then(function (response) {
                        clientGet().push(setData(response.data.results))
                    }).catch(error => {
                        console.log(error);
                    })
                Swal.fire(
                    'Eliminado!',
                    'Registro eliminado con exito!.',
                    'success'
                )
            }
        })
    }

    // console.log(Data)
    const alertaGuardar = () => {
        Swal({
            title: "Bien!",
            text: "Registro guardado con exito!",
            icon: "success",
            button: "Ok",
        });
    }

    useEffect(() => {
        clientGet();
    }, [])

    const COMPOENTN = () => {
        var _LIST = [];
        var G = Data == undefined ? [] : Data
        for (var i = 0; i < G.length; i++) {
            _LIST.push(G[i])
        }
        const columns = [
            {
                name: <label><b>Id</b></label>,
                selector: 'id',
                sortable: true,
                filterable: true,
                cell: row => <h6 className="text-center">{row.id}</h6>
            },
            {
                name: <label><b>Nombre</b></label>,
                selector: row => row.name,
                sortable: true,
                filterable: true,
                cell: row => <h6 className="text-center">{row.name}</h6>
            },
            {
                name: <label><b>Categoria</b></label>,
                selector: row => row.category,
                sortable: true,
                filterable: true,
                cell: row => <h6 className="text-center">{row.category}</h6>
            },
            {
                name: <label><b>Tutor</b></label>,
                selector: row => row.instructor,
                sortable: true,
                filterable: true,
                cell: row => <h6 className="text-center">{row.instructor}</h6>
            },
            {
                name: <label><b>Temas</b></label>,
                selector: row => row.topics,
                sortable: true,
                filterable: true,
                cell: row => <h6 className="text-center">{row.topics}</h6>
            },
            {
                name: <label><b>Modalidad</b></label>,
                selector: row => row.modality,
                sortable: true,
                filterable: true,
                cell: row => <h6 className="text-center">{row.modality}</h6>
            },
            {
                name: <label><b>Disponibilidad</b></label>,
                selector: row => row.availability,
                sortable: true,
                filterable: true,
                cell: row => <h6 className="text-center"> {row.availability == true ? <label>Disponible</label> : row.availability == false ? <label>No Disponible</label> : ''} </h6>
            },
            {
                name: <label><b>ACCIÓNES</b></label>,
                button: true,
                minWidth: '150px',
                cell: row => <>

                    <div className='px-1'></div>
                    <button className="btn btn-sm btn-danger btn-sm mx-0 px-1 shadow-none" onClick={() => ClientDelete(row)}> <i className="fas fa-backspace"></i>
                    </button>

                </>,
            },
        ]
        var _COMPONENT = <DataTable
            paginationComponentOptions={{ rowsPerPageText: 'Publicaciones por Pagina:', rangeSeparatorText: 'de' }}
            noDataComponent="No hay mensajes"
            striped="true"
            columns={columns}
            data={_LIST}
            // expandableRows expandableRowsComponent={ExpandedComponent}
            highlightOnHover
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 20, 50, 100, 500, 1000]}
            className="data-table-component"
            noHeader
        />
        return _COMPONENT;
    }
    return <>
        <Navar></Navar>
        <div className='container'>
            <h3 className='text-center'>Listado Cursos Disponibles</h3>
            <div className='py-4'>
                <ButtonToolbar>
                    <Button size="sm" onClick={() => handleOpen('sm')}>
                        Small
                    </Button>
                </ButtonToolbar>
                {COMPOENTN()}
            </div>
        </div>
        <div className='justify-content-center'>
            <Modal size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name-10">
                            <Form.Control name="name" placeholder="Nombre" />
                        </Form.Group>

                        <Form.Group controlId="categoria-10">
                            <Form.Control name="category" placeholder="Categoria" />
                        </Form.Group>
                        <Form.Group controlId="instructor-10">
                            <Form.Control name="instructor" placeholder="instructor" />
                        </Form.Group>
                        <Form.Group controlId="topics-10">
                            <Form.Control name="topics" placeholder="Temas" />
                        </Form.Group>
                        <Form.Group controlId="modality-10">
                            <Form.Control name="modality" placeholder="Modalidad" />
                        </Form.Group>
                        <Form.Group controlId="availability-10">
                            <Form.Control name="availability" placeholder="Disponibilidad" />
                        </Form.Group>
                        <Button onClick={() => peticionPost()} appearance="primary">
                        Guardar
                    </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} appearance="primary">
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </>
}
