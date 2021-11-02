import React, { useState } from 'react'
import { unediableFields } from '../../../constants'
import { camelToSentence, moneyFormat } from '../../../utils/textFormat'

function InputText({ fieldName, fieldValue }) {

    const [field, setField] = useState(fieldValue ?? '')


    return (
        <div className="m-3 row">
            <label htmlFor={fieldName} className="col-6">{camelToSentence(fieldName)}</label>
            <input type="text" className="col-6" id={fieldName} aria-describedby={fieldName}
                name={fieldName} value={moneyFormat(field)} disabled={unediableFields.includes(fieldName)}
                onChange={e => setField(e.target.value)}
            />
        </div>
    )
}

export default InputText
