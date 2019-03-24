import MaskedInput from 'react-text-mask';
import React from 'react';

export const modalCode = {
    padding: "2rem",
    margin: "30vh auto",
    maxWidth: "500px",
    backgroundColor: "white",
    textAlign: "center"
}


const phoneRegex = /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\(\d{3}\)\s\d{3}-\d{4}$/
const firebasePhoneRegex = /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\s\d{10}$/

export const normalizePhone = (userInputPhone) => {
    if (phoneRegex.test(userInputPhone)) {
        const firebasePhone = userInputPhone.split(/[()\s-]/).filter(piece => piece.length > 0).map(piece => {
            if (piece[0] === '+') return (`${piece} `)
            return piece
        }).join('')
        if (firebasePhoneRegex.test(firebasePhone)) {
            return firebasePhone
        }
    }
    return false;
}

export function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
    return (
      <MaskedInput {...other} placeholderChar={'\u2000'}
        ref={ref => {inputRef(ref ? ref.inputElement : null)}}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    );
  }