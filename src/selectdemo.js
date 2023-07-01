import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
function Selectdemo() {
    const [getcountry, setCountry] = useState([]);
    const [getCountryid, setCountryid] = useState("");
    const [getrowdata, setGetrowdata] = useState([]);
    useEffect(() => {
        const getcountrydata = async () => {
            const reqData = await fetch("https://teammember.techpanda.art/api/user/fieldmaster/");
            const resData = await reqData.json();
            setCountry(await resData);
        };
        getcountrydata();
    }, []);
    const handlecountry = (event) => {
        const getCountryid = event.target.value;
        setCountryid(getCountryid);
    };
    useEffect(() => {
        const getCountryrowdata = async () => {
            const reqCountryrowdata = await fetch(
                `https://teammember.techpanda.art/api/user/fieldmaster/${getCountryid}`
            );
            const reqcountryrowdata = await reqCountryrowdata.json();
            setGetrowdata(await reqcountryrowdata);
        };
        getCountryrowdata();
    }, [getCountryid]);
    return (
        <React.Fragment>
            <Container className="content">
                <div className="row">
                    <div className="col-sm-12">
                        <h2 className="mt-4 mb-4 fw-bold">
                            Select Country, auto fill dial code and flag in input using React
                            js {getCountryid}
                        </h2>
                        <form className="row g-3" method="post">
                            <div className="col-md-3">
                                <label className="form-label">Country </label>
                                <div className="input-group mb-2">
                                    <select
                                        name="country"
                                        className="form-control p-2"
                                        onChange={(e) => handlecountry(e)}
                                    >
                                        <option value="">--Select Country--</option>
                                        {getcountry.map((resCountry, index) => (
                                            <option key={index} value={resCountry.id}>
                                                {resCountry.field}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Dialcode </label>
                                <div className="input-group mb-2">
                                    {getCountryid.length > 0 && (
                                        <div className="input-group-prepend">
                                            <div className="input-group-text btn btn-success p-2">
                                                <img
                                                    src={
                                                        process.env.PUBLIC_URL +
                                                        "/flags/24X24/" +
                                                        getrowdata.iso +
                                                        ".png"
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="input-group-prepend">
                                        <div className="input-group-text btn btn-success p-2">
                                            +
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        name="phonecode"
                                        className="form-control p-2"
                                        placeholder="Dialcode"
                                        value={getrowdata.placeholder_message}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Phone No </label>
                                <div className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control p-2"
                                        id="inlineFormInputGroup"
                                        placeholder="Enter Phone No"
                                        maxLength="10"
                                        value={getrowdata.error_message}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <label className="form-label"></label>
                                <div className="input-group mb-2">
                                    <button name="button" className="btn btn-success mt-2">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
}
export default Selectdemo;