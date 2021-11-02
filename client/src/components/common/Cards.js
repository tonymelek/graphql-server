import React from 'react'
import { camelToSentence, moneyFormat } from '../../utils/textFormat'
import ActionButton from './ActionButton'



const Cards = ({ cardsData, headers }) => {
    return (
        <div className="d-flex flex-wrap">
            {cardsData.map(item =>
                <div className="card p-2 m-2 w-100" key={item.id}>
                    {headers.map((header, index) =>
                        <div className="row" key={`${item.id}-${index}`}>
                            <div className="col-6">{camelToSentence(header)}</div>
                            <div className="col-6">{moneyFormat(item[header])}</div>
                        </div>
                    )}
                    <ActionButton details={item} />
                </div>)}
        </div>
    )
}

export default Cards