import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Form, Button, Col, Row } from 'react-bootstrap';
import Sidebar from '../Components/Sidebar/Sidebar';
import Nav from '../Components/Navbar/Unav';
import apiService from '../Components/services/apiService';
import { toast } from 'react-toastify';

function TeamLeader() {
    const { control, handleSubmit, register, reset, setError, watch, formState: { errors } } = useForm();
    const [stateData, setStateData] = useState([])
    const [cityData, setCityData] = useState([])

    const getState = async () => {
        try {
            const result = await apiService().get('getState')
            setStateData(result.data.data)
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    }

    const getCity = async (event) => {
        try {
            const result = await apiService().get(`getCity?id=${event.target.value}`)
            setCityData(result.data.data)
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    }
    const checkPhone = async (value) => {
        try {
            const result = await apiService().post('checkPhoneNumber', { phone: value.target.value })
            if (result.data.isExist) {
                setError('phone', {
                    type: 'manual',
                    message: 'Phone number already exists.'
                },{shouldFocus:true});
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkAadharNumber = async (value) => {
        try {
            const result = await apiService().post('checkAadharNumber', { aadharNumber: value.target.value })
            if (result.data.isExist) {
                setError('aadharNumber', {
                    type: 'manual',
                    message: 'Aadhar Number number already exists.'
                },{shouldFocus:true});
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = (data) => {
        try {
            // Create the bankDetails object
            const bankDetails = {
                accountNumber: data.accountNumber,
                bankName: data.bankName,
                bankIFSCCode: data.bankIFSCCode,
                bankBranchName: data.bankBranchName
            };
            // Add address and bankDetails to the original data object
            data.bankDetails = bankDetails;
            delete data.accountNumber
            delete data.reenterAccountNumber
            delete data.bankName
            delete data.bankIFSCCode
            delete data.bankBranchName
            const result = apiService().post('createUser', data)
            toast.success('team leader created successs!!!')
            console.log(result);
            reset()
        } catch (error) {
            console.log(error);
            toast.error(error)

        }
    }

    useEffect(() => {
        getState()
    }, [])

    const stateController = register("state", { required: 'this filed is required' })
    const cityController = register("city", { required: 'this filed is required' })
    const phoneController = register('phone', { required: true, pattern: /^[0-9]{10}$/ })
    const aadharNumberController = register('aadharNumber', { required: true, pattern: /^[0-9]{12}$/ })

    return (
        <>
            <Nav />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) =>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control {...field}
                                    name="firstName" {...register('firstName', { required: "this filed is required" })} />
                                {errors?.firstName && <small style={{ color: 'red' }}>This field is required</small>}
                            </Form.Group>
                        }
                    />

                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name="lastName" {...register('lastName', { required: "this filed is required" })} />
                        {errors?.lastName && <small style={{ color: 'red' }}>This field is required</small>}
                    </Form.Group >
                    <Form.Group controlId="middleName">
                        <Form.Label>Middle Name</Form.Label>
                        <Form.Control name="middleName" {...register('middleName', { required: "this filed is required" })} />
                        {errors?.middleName && <small style={{ color: 'red' }}>This field is required</small>}
                    </Form.Group >
                    <Form.Group controlId='fatherName'>
                        <Form.Label>Father Name</Form.Label>
                        <Form.Control name="fatherName" {...register('fatherName', { required: "this filed is required" })} />
                        {errors?.fatherName && <small style={{ color: 'red' }}>This field is required</small>}
                    </Form.Group >
                    <Form.Group controlId='motherName'>
                        <Form.Label>Mother Name</Form.Label>
                        <Form.Control name="motherName" {...register('motherName', { required: "this filed is required" })} />
                        {errors?.motherName && <small style={{ color: 'red' }}>This field is required</small>}
                    </Form.Group >
                    <Form.Group controlId='dateOfBirth'>
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type='date' name="dateOfBirth" {...register('dateOfBirth', { required: "this filed is required" })} />
                        {errors?.dateOfBirth && <small style={{ color: 'red' }}>This field is required</small>}
                    </Form.Group >
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                        {errors?.email && errors?.email.type === 'required' && (
                            <small style={{ color: 'red' }}>This field is required</small>
                        )}
                        {errors?.email && errors?.email.type === 'pattern' && (
                            <small style={{ color: 'red' }}> Invalid email format</small>
                        )}
                    </Form.Group >
                    <Form.Group as={Row} >
                        <Form.Label>Address</Form.Label>
                        <Col sm={12} className="mb-2">
                            <Form.Select aria-label="Default select example" id='state' {...stateController}
                                onChange={e => {
                                    stateController.onChange(e)
                                    getCity(e)
                                }}

                            >
                                <option value="">Select State</option>
                                {stateData?.map((item, index) =>
                                    <option key={index} value={item._id}>{item.name}</option>
                                )}
                            </Form.Select>
                            {errors?.state && <small style={{ color: 'red' }}>This field is required</small>}
                        </Col>
                        <Col sm={12} className="mb-2">
                            <Form.Select aria-label="Default select example" {...cityController} id='city'
                                onChange={e => {
                                    stateController.onChange(e)
                                }}
                            >
                                <option value="">Select City</option>
                                {cityData?.map((item, index) =>
                                    <option key={index} value={item._id}>{item.name}</option>
                                )}
                            </Form.Select>
                            {errors?.city && <small style={{ color: 'red' }}>This field is required</small>}
                        </Col>
                        <Col sm={12} className="mb-2">
                            <Form.Control id='pincode'
                                type="text"
                                placeholder="Pincode"
                                name="pincode"
                                {...register('pincode', { required: 'This field is required' })}
                            />
                            {errors?.pincode && <small style={{ color: 'red' }}>This field is required</small>}
                        </Col>
                    </Form.Group>

                    <Form.Group controlId='phone'>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control name="phone" {...phoneController}
                            onChange={(e) => {
                                phoneController.onChange(e)
                            }
                            }
                            onBlur={(e) => {
                                phoneController.onBlur(e)
                                checkPhone(e)
                            }}
                        />
                        {errors?.phone && errors?.phone.type === 'required' && (
                            <small style={{ color: 'red' }}>This field is required</small>
                        )}
                        {errors?.phone && errors?.phone.type === 'pattern' && (
                            <small style={{ color: 'red' }}>Phone number must be 10 digits</small>
                        )}
                        {errors?.phone && errors?.phone.type === 'manual' && (
                            <small style={{ color: 'red' }}>Phone number already exists.</small>
                        )}
                    </Form.Group >
                    <Form.Group controlId='aadharNumber'>
                        <Form.Label>Adhar Number</Form.Label>
                        <Form.Control name="aadharNumber" {...aadharNumberController}
                            onChange={(e) => {
                                aadharNumberController.onChange(e)
                            }
                            }
                            onBlur={(e) => {
                                aadharNumberController.onBlur(e)
                                checkAadharNumber(e)
                            }}
                        />

                        {errors?.aadharNumber && errors?.aadharNumber.type === 'required' && (
                            <small style={{ color: 'red' }}>This field is required</small>
                        )}
                        {errors?.aadharNumber && errors?.aadharNumber.type === 'pattern' && (
                            <small style={{ color: 'red' }}>Aadhar number must be 12 digits</small>
                        )}
                        {errors?.aadharNumber && errors?.aadharNumber.type === 'manual' && (
                            <small style={{ color: 'red' }}>Aadhar number Already exist.</small>
                        )}
                    </Form.Group >
                    <Form.Group controlId='password' >
                        <Form.Label>password</Form.Label>
                        <Form.Control name="password" {...register('password', { required: "this filed is required" })} />
                        {errors?.password && <small style={{ color: 'red' }}>This field is required</small>}
                    </Form.Group >
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="confirmPassword" {...register('confirmPassword', {
                            required: "This field is required",
                            validate: value => value === watch('password') || "Passwords do not match"
                        })} />
                        {errors?.confirmPassword && <small style={{ color: 'red' }}>{errors.confirmPassword.message}</small>}
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label>Bank Details</Form.Label>
                        <Col sm={12} className="mb-2">
                            <Form.Control id='accountNumber'
                                type="text"
                                placeholder="Account Number"
                                name="accountNumber"
                                style={{ width: '100%' }}
                                {...register('accountNumber', { required: 'This field is required' })}
                            />
                            {errors?.accountNumber && <small style={{ color: 'red' }}>This field is required</small>}
                        </Col>
                        <Col sm={12} className="mb-2">
                            <Form.Control
                                id='reenterAccountNumber'
                                type="text"
                                placeholder="Reenter Account Number"
                                name="reenterAccountNumber"
                                style={{ width: '100%' }}
                                {...register('reenterAccountNumber', {
                                    required: 'This field is required',
                                    validate: value => value === watch('accountNumber') || "Account Number do not match"
                                })}
                            />
                            {errors?.reenterAccountNumber && <small style={{ color: 'red' }}>{errors.reenterAccountNumber.message}</small>}
                        </Col>
                        <Col sm={12} className="mb-2">
                            <Form.Control
                                type="text"
                                placeholder="Bank Name"
                                name="bankName"
                                id='bankName'
                                style={{ width: '100%' }}
                                {...register('bankName', { required: 'This field is required' })}
                            />
                            {errors?.bankName && <small style={{ color: 'red' }}>This field is required</small>}
                        </Col>

                        <Col sm={12} className="mb-2">
                            <Form.Control
                                type="text"
                                placeholder="Bank IFSC Code"
                                name="bankIFSCCode"
                                id='bankIFSCCode'
                                style={{ width: '100%' }}
                                {...register('bankIFSCCode', { required: 'This field is required' })}
                            />
                            {errors?.bankIFSCCode && <small style={{ color: 'red' }}>This field is required</small>}
                        </Col>
                        <Col sm={12}>
                            <Form.Control
                                type="text"
                                placeholder="Bank Branch Name"
                                name="bankBranchName"
                                id='bankBranchName'
                                style={{ width: '100%' }}
                                {...register('bankBranchName', { required: 'This field is required' })}
                            />
                            {errors?.bankBranchName && <small style={{ color: 'red' }}>This field is required</small>}
                        </Col>
                    </Form.Group>

                    <Form.Group >
                        <Button type="primary">
                            Submit
                        </Button>
                    </Form.Group >
                </Form>
            </div>
        </>
    )

}

export default TeamLeader

