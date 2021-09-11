import React from 'react';
import './MemberAvatar.scss'

const MemberAvatar = (member,urlApi) => {

    if (!!member) {
        const color = member.color ? member.color : "#fff"
        const urlImage = urlApi.includes('url/test/') ? `/trombinoscope/${member.pict}`
                            : `${urlApi}/trombinoscope/${member.pict}`

        const backgroundImg = !!member.pict ? `url('${urlImage}')` : 'none'

        const nom = member.nom ? member.nom : `M ${member.id}`
        const matches = nom.match(/\b(\w)/g)
        const acronym = !!member.pict? '\u00A0' : matches.join('')

        return (
            <div key={member.id} className="member-avatar" style={{ borderColor: color, backgroundColor: color, backgroundImage: backgroundImg }}>
                <span className="acronym">{acronym}</span>
            </div>
        )

    } else {
        return <>ND</>
    }

}


export default MemberAvatar