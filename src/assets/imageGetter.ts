import iconTeam from './images/icons/iconTeam.svg';
import iconEnvoirment from './images/icons/iconEnvoirment.svg';
import iconStar from './images/icons/iconStar.svg';
import iconFire from './images/icons/iconFire.svg';
import iconAudio from './images/icons/iconAudio.svg';
import iconLockCircle from './images/icons/iconLockCircle.svg';
import iconSmile from './images/icons/iconSmile.svg';
import iconUser from './images/icons/iconUser.svg';
import iconHistory from './images/icons/iconHistory.svg';

const icons = {
    svg: {
        iconTeam: iconTeam,
        iconEnvoirment: iconEnvoirment,
        iconUser: iconUser,
        iconStar: iconStar,
        iconFire: iconFire,
        iconAudio: iconAudio,
        iconLockCircle: iconLockCircle,
        iconSmile: iconSmile,
        iconHistory: iconHistory,
    }
};

export type svg = typeof icons.svg;

export const getSVGByKey = (key: keyof svg) => {
    if (icons.svg.hasOwnProperty(key)) {
        return icons.svg[key]
    } else {
        return ''
    }
};