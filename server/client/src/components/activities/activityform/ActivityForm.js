import React from 'react';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from "primereact/inputtextarea";
import {Checkbox} from "primereact/checkbox";
import {Calendar} from "primereact/calendar";
import 'primereact/components/inputtext/InputText.css';

//====>  QUESTIONS HAVE TO BE GENERIC & HIGH LEVEL
// time sensitive event or list indefinitely
// min party size
//
export const ActivityForm = function (props) {

    return (
        <div className="p-col-12 p-md-12">
            <div className="card card-w-title">
                <h1>New Activity</h1>
                <div className="p-grid form-group">

                    <div className="p-col-12 p-md-6">
                        <span className="md-inputfield">
                            <InputText/>
                            <label>Title of activity</label>
                        </span>
                    </div>

                    <div className="p-col-12 p-md-6">
                        <span className="md-inputfield">
                            <InputText/>
                            <label>where</label>
                        </span>
                    </div>
                </div>

                <div className="p-grid form-group">
                    {/*=======  LEFT SIDE*/}
                    <div className="p-col-12 p-md-6">
                        <div className="p-grid form-group">
                            <div className="p-col-12 p-md-12">
                                <span className="md-inputfield">
                                <label>
                                    <Checkbox />Activity is an Event
                                </label>
                                </span>
                            </div>

                            <div className="p-col-12 p-md-12">
                                <span className="md-inputfield">
                                <InputText/>
                                <label>event URL</label>
                                </span>
                            </div>

                        </div>
                    </div>


                    {/*========= RIGHT SIDE  */}
                    <div className="p-col-12 p-md-6">
                        <label>
                            <Checkbox /> Date Sensitive </label>

                        {/*===== ADD SHOW AND HIDE FUNCTION */}
                        <div className="card card-w-title">
                            <h1>Calendar</h1>
                            <Calendar inline={true}/>

                            <div className="p-grid form-group" style={{marginTop: '20px'}}>
                                <div className="p-col-12">
                                    <Calendar placeholder="start"/>
                                </div>
                                <div className="p-col-12">
                                    <Calendar placeholder="end"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                    {/*<div className="p-col-12 p-md-6 ">*/}
                        {/*<div className="p-col-12">*/}

                        {/*</div>*/}


                        {/*<div className="p-col-12 p-md-12">*/}
                            {/*<h2>Description</h2>*/}
                            {/*<InputTextarea className='p-inputtextarea-resizable' col={5} placeholder="It's sunny, lets ..." autoResize={true}/>*/}
                        {/*</div>*/}

                    {/*</div>*/}




            </div>
        </div>
    )
};
