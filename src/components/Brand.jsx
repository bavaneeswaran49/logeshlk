import useLanguage from '../i18n/useLanguage'
export default function Brand({ onClick }) {
  const { t } = useLanguage()
  return <a className="brand" href="#home" aria-label={t("Sri Builders home")} onClick={onClick}>
    {/* <span className="brand-monogram" aria-hidden="true"><span /></span> */}
    <span className="brand-type">{t("SRI BUILDERS")}<span>{t("AND DEVELOPERS")}</span></span>
  </a>
}
