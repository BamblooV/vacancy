import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react'


export type CardProps = {
  logo: string | undefined;
  form: string;
  company: string;
  linkToSite: string;
  address: string;
  jobName: string;
  description: string;
};


export const Card: React.FC<CardProps> = ({ logo, form, company, linkToSite, address, jobName, description }) => {

  const [isClosed, setIsClosed] = useState<Boolean>(true);
  const openHandler = () => {
    setIsClosed(prev => !prev);
  }

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = description;
  }, [ref.current])

  return (
    <article className="vacancy">
      <div className="vacancy__employer employer">
        <img src={Boolean(logo) ? logo : "/No-logo.png"} alt={company + "logo"} className="employer__logo" />
        <ul className="employer__description">
          <li className="employer__item"><span>Form:</span>&nbsp;{form}</li>
          <li className="employer__item">
            <span>Company:</span>&nbsp;{company}
          </li>
          <li className="employer__item">
            <span>Web:</span>&nbsp;{Boolean(linkToSite) && <a href={linkToSite}>{linkToSite}</a>}
          </li>
          <li className="employer__item">
            <span>Address: </span>&nbsp;{address}
          </li>
        </ul>
      </div>
      <div className={classNames("vacancy__about", { "vacancy__about-closed": isClosed })}>
        <h3 className="vacancy__title">
          {jobName}
        </h3>
        <div ref={ref} className="vacancy__description">

        </div>
        <button onClick={() => openHandler()} className="btn btn-details">{isClosed ? 'more details' : 'close'}</button>
      </div>
    </article>
  )
}