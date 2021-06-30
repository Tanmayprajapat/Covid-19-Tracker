import React from 'react'
import './infobox.css'
import { Card, CardContent, Typography } from '@material-ui/core'
function InfoBox({ title,isRed,isGreen, cases,active, total,...props }) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${active && isRed && "infoBox--red"}`}>
            <CardContent>
                <Typography  className="InfoBox__title">
                    {title}
                </Typography>
                <h2 className={`InfoBox__cases ${isGreen && "infoBox--notRed"}`}>{cases}</h2>
                <Typography  className="InfoBox__total">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
