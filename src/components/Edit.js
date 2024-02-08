

import React, { useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { editTodo, singleTodo } from '../features/todo/todoSlice';
import Layout from './Layout';

const signUpSchema = yup.object({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    status: yup.string().required("Status is Required"),
});

const Edit = () => {
    const navigate = useNavigate();
    const todoState = useSelector((state) => state?.todo?.todo);
    const dispatch = useDispatch();
    const { id } = useParams("");
    
    useEffect(() => {
        dispatch(singleTodo(id));
    }, [id, dispatch]);
    
    useEffect(() => {
        if (todoState) {
          formik.setValues(todoState);
        }
    }, [todoState]);
    
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            status: '',
        },
        validationSchema: signUpSchema,
        onSubmit: async (values) => {
            const action = await dispatch(editTodo({
                prodId: id,
                todoData: values
            }));

            if (!action.error) {
                navigate('/');
            }
        },
    });

    return (
        <>
            <Layout />
            <div className="container">
                <NavLink to="/">Home2</NavLink>
                <form className="mt-4" onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="mb-3 col-lg-12">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" id="title" placeholder="Enter Title of Todo" />
                            {formik.touched.title && formik.errors.title && <div className="error">{formik.errors.title}</div>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-lg-12">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" id="description" placeholder="Enter Description" rows="5" />
                            {formik.touched.description && formik.errors.description && <div className="error">{formik.errors.description}</div>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-lg-12">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select name="status" value={formik.values.status} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" id="status">
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                            {formik.touched.status && formik.errors.status && <div className="error">{formik.errors.status}</div>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-lg-12">
                            <button type="submit" className="button border-0 btn btn-primary">Edit Todo</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Edit;
