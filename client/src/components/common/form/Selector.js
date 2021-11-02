import React from 'react'
import { selectorFields } from '../../../constants'
import { camelToSentence } from '../../../utils/textFormat'

function Selector({ fieldName, fieldValue }) {


    return (
        <div className="m-3 row">
            <label htmlFor={fieldName} className="col-6">{camelToSentence(fieldName)}</label>

            <select className="col-6" aria-label={fieldName} name={fieldName} defaultValue={fieldValue}>
                {
                    selectorFields[fieldName].map(item => <option value={item} key={item}>{camelToSentence(item)}</option>)
                }
            </select>
        </div>
    )
}

export default Selector
