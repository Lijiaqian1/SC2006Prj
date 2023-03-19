import React from 'react';
import ResultComponent from '../ResultComponent/ResultComponent';

const ResultList = (props) => {

    return(
        <div>
            {
                props.CarArray.map(carsdata => {
                    return <ResultComponent carsdata = {carsdata} /> 
                })
            }
        </div>

    )

}

export default ResultList;