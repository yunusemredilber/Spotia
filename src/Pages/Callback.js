import React, {Component} from 'react';

import queryString from 'query-string';

import { connect } from 'react-redux';

import {setToken} from "../Actions/auth-actions";
import {clearLocalToken,setLocalToken} from "../Services/authOperations";
import {BACKEND_BASE} from "../confing/env";

class Callback extends Component {



    constructor(props) {
        super(props);
        let data = queryString.parse(this.props.location.search);

        if (data)
        {
            if(data.code){
                let temp = this.props.location.search;
                this.props.history.push(`/`);
                window.location.replace(BACKEND_BASE+"callback/"+temp);
            }
        }
    };

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q);
        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }



    render() {
        console.log(this.getHashParams());
        return (
            <div>
                Callback
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    return {...state,...props};
};

const mapDispatchToProps = {
    setToken
};
export default connect(mapStateToProps,mapDispatchToProps)(Callback);