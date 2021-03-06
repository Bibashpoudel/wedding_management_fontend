import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Card from '../components/Card'
import { ServiceTypeDetails } from '../Action/ServicesAction'
import './VenueDisplay.scss'
export default function ServiceDisplay(props) {


    const typeId = props.match.params.id;
    const particularSType = useSelector(state => state.particularSType)
    const {loading, error, PStype} = particularSType

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ServiceTypeDetails(typeId))
    }, [dispatch, typeId])
    return (
        <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-8 col-md-3">
              <select className="form-select rounded-0 mt-2 mb-2">
                <option value={""}>Open this select menu</option>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
              </select>
            </div>
            <div className="w-100" />
    {
      loading ?<LoadingBox></LoadingBox>
      :
      error ? <MessageBox>{error}</MessageBox>
      :
    
            <div className="row-flex" >
            {PStype.map((Stype) => (
              
              <div className="col-xl-3 col-lg-4 col-6" >
                <Card  service={Stype} key={Stype.id}/>
              </div>
            
          ))}
            </div>
}
          </div>
        </div>
      </div>
    
  );
}
  
