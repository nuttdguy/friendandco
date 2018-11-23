import React from 'react';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {Checkbox} from "primereact/checkbox";
import {Calendar} from "primereact/calendar";


//====>  QUESTIONS HAVE TO BE GENERIC & HIGH LEVEL
// time sensitive event or list indefinitely
// min party size
//
export const ActivityForm = function (props) {

    return (
        <div className="p-grid p-fluid">
            <div className="p-col-12 p-col-12">
                <div className="card card-w-title">
                    <h1>Activity</h1>

                    <div className="p-grid form-group">
                        <div className="p-col-12 p-md-6">
                            <span className="md-inputfield">
                                <label>Title of Activity</label>
                                <InputText/>
                            </span>
                        </div>
                        <div className="p-col-12 p-md-6">
                           <span className="md-inputfield">
                                <label>Where</label>
                                <InputText/>
                            </span>
                        </div>
                    </div>

                    <h1>Description </h1>
                    <div className="p-grid form-group">
                        <div className="p-col-12 p-md-6">
                            <InputTextarea rows={3} maxLength={140} counter="display"
                                           counterTemplate="{0} characters remaining"
                                           className="p-inputtextarea p-component p-inputtextarea-resizable"
                                           style={{borderBottom: '1px solid rgba(0, 0, 0, .05'}}
                                           placeholder="It's sunny, lets ..."
                            />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <InputTextarea rows={3} maxLength={140} counter="display"
                                           counterTemplate="{0} characters remaining"
                                           className="p-inputtextarea p-component p-inputtextarea-resizable"
                                           style={{borderBottom: '1px solid rgba(0, 0, 0, .05'}}
                                           placeholder="Activity tags, e.g. sunny, fun, adventure, water, exercise, friendship, ..."
                            />
                        </div>

                    </div>


                    <Button label="Submit" className="indigo-btn p-button-text-only" style={{margin: '20px 0 10px'}}> </Button>

                </div>

            </div>

        </div>
    )
};
