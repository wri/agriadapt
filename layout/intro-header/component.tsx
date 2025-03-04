import { useEffect, useState } from "react";
import Image from "next/image";
import classnames from "classnames";
import Field from "components/form/Field";
import Select from "react-select";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const IntroHeader = ({
  id = "LANDING",
  countries = null,
  image,
  blob,
  title = "",
  subtitle = "",
  description = [],
  button = undefined,
  country,
  setCountry,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { t } = useTranslation([id.toLowerCase(), "common", "countries"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100); // Add class after 100px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToNext = () => {
    const bannerDiv = document.querySelector(".chevron_next_div");
    if (bannerDiv) {
      const nextSection = bannerDiv.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSelectCountry = (c) => {
    setCountry(c);
    router.push(
      {
        query: {
          ...router.query,
          geostore: c.value,
        },
      },
      {},
      { shallow: true }
    );
  };

  return (
    <div className="c-intro-header chevron_next_div">

      <div
        className={`chevron_btn ${scrolled ? "scrolled" : ""}`}
        onClick={handleScrollToNext}
      >
         <div className='scroll_btn'>Scroll down</div>
      </div>

      <div
        className={classnames({
          "visual-container": true,
          "-right":
            id !== "LANDING" && id !== "CROPSRICE" && id !== "CROPSCOTTON",
        })}
      >
        <div
          className={classnames({
            "image-container": true,
            "-landing": id === "LANDING",
            "-about": id === "ABOUT",
            "-rice": id === "RICE",
            "-coffee": id === "COFFEE",
            "-cotton": id === "COTTON",
            "-adaptation": id === "ADAPTATION",
            "-cropsrice": id === "CROPSRICE",
            "-cropscotton": id === "CROPSCOTTON",
            "-input": id === "INPUT",
          })}
        >
          <Image
            className="image"
            loader={({ src }) => src}
            src={image}
            alt={t(title)}
          />
        </div>
        <div className="blob-container">
          <Image loader={({ src }) => src} src={blob} alt="image" />
        </div>
      </div>

      <div className="c-content">
        <div className="l-container">
          <div className="row">
            <div className="column small-12">
              <div
                className={classnames({
                  "info-container": true,
                  "-right":
                    id === "LANDING" ||
                    id === "CROPSRICE" ||
                    id === "CROPSCOTTON",
                  "-landing": id === "LANDING",
                  "-about": id === "ABOUT",
                  "-adaptation": id === "ADAPTATION",
                })}
              >
                <h2>{t(title)}</h2>
                <h3>{t(subtitle)}</h3>
                {description.map((d, i) => (
                  <p key={`desc-${i}`}
                  className="description"
                  dangerouslySetInnerHTML={{ __html: t(d) }} ></p>
                  
                 
                ))}
                {id === "LANDING" && button && (
                  <div className="d-flex landing_btn flex-wrap">
                    
                  <Link href={button.url} passHref>
                    <a
                      className={classnames({
                        "c-button": true,
                        "-primary": true,
                      })}
                    >
                      {t(button.label)}
                    </a>
                  </Link>
                  <Link href={button.url2} passHref>
                  <a
                    className={classnames({
                      "c-button": true,
                      "-primary": true,
                    })}
                  >
                    {t(button.label2)}
                  </a>
                </Link>
                </div>
                )}
                {countries && (
                  <div className="country-selector">
                    <Field
                      id="VALUE_CHAINS"
                      properties={{
                        label: t("common:Select_Country"),
                        default: {
                          ...country,
                          sql_label: country.sql_label ?? country.label,
                          label: t(`countries:${country.label}`, {
                            keySeparator: ":",
                          }),
                        },
                      }}
                      options={countries.map((c) => ({
                        ...c,
                        sql_label: c.sql_label ?? c.label,
                        label: t(`countries:${c.label}`, { keySeparator: ":" }),
                      }))}
                      className={"Select--large"}
                      onChange={handleSelectCountry}
                      value={{
                        ...country,
                        sql_label: country.sql_label ?? country.label,
                        label: t(`countries:${country.label}`, {
                          keySeparator: ":",
                        }),
                      }}
                      placeholder={t("common:Select_Country")}
                    >
                      {Select}
                    </Field>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroHeader;
