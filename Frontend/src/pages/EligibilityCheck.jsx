import { useState } from "react";
import { Icon, PageHero, Select } from "../components/ui";
import {
  STATES,
  INCOME_OPTIONS,
  RATION_OPTIONS,
  CATEGORY_OPTIONS,
  stateSchemeName,
} from "../data/schemes";
import { searchSchemes } from "../services/api";

export default function EligibilityCheck() {
  const [p, setP] = useState({
    state: "",
    income: "",
    ration: "",
    category: "",
  });

  const [result, setResult] = useState(null);

  const set = (key) => (value) => {
    setP((old) => ({
      ...old,
      [key]: value,
    }));
  };

  const ready =
    p.state &&
    p.income &&
    p.ration &&
    p.category;

  const submit = async (e) => {
    e.preventDefault();

    try {
      const query = `I live in ${p.state}. My annual household income is ${p.income}. I have a ${p.ration} ration card and belong to ${p.category} category. Which government health schemes am I eligible for?`;

      const data = await searchSchemes(query);

      console.log("Search API response:", data);

      // Make sure we always have an array
      const matches = Array.isArray(data?.results)
        ? data.results
        : [];

      setResult({
        profile: p,
        matches,
      });

      setTimeout(() => {
        document
          .getElementById("matches")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Search error:", error);
      alert(error.message || "Search failed. Please try again.");
    }
  };

  const resetForm = () => {
    setP({
      state: "",
      income: "",
      ration: "",
      category: "",
    });

    setResult(null);
  };

  return (
    <>
      <PageHero
        eyebrow="Entitlement Discovery"
        icon="assignment_turned_in"
        title="Check Eligibility"
      >
        No Aadhaar needed. Tell us a little about your household and see which
        health schemes you may qualify for.
      </PageHero>

      <section className="px-6 lg:px-12 pb-28">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">

          <form
            onSubmit={submit}
            className="neu-raised p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <Select
              label="State / Union Territory"
              value={p.state}
              onChange={set("state")}
              options={STATES}
              placeholder="Select state"
            />

            <Select
              label="Annual Household Income"
              value={p.income}
              onChange={set("income")}
              options={INCOME_OPTIONS}
              placeholder="Select income range"
            />

            <Select
              label="Ration Card Type"
              value={p.ration}
              onChange={set("ration")}
              options={RATION_OPTIONS}
              placeholder="Select ration card"
            />

            <Select
              label="Beneficiary Category"
              value={p.category}
              onChange={set("category")}
              options={CATEGORY_OPTIONS}
              placeholder="Select category"
            />

            <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={!ready}
                className="neu-btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Find My Schemes
                <Icon
                  name="arrow_forward"
                  className="text-lg"
                />
              </button>

              <button
                type="button"
                className="neu-btn !text-on-surface-variant"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </form>

          {result && (
            <div
              id="matches"
              className="flex flex-col gap-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-headline-md text-primary">
                  You may qualify for {result.matches.length} program
                  {result.matches.length === 1 ? "" : "s"}
                </h2>

                <button
                  className="neu-btn neu-btn-sm no-print"
                  onClick={() => window.print()}
                >
                  <Icon
                    name="print"
                    className="text-[16px]"
                  />
                  Save Checklist
                </button>
              </div>

              {result.matches.length === 0 && (
                <div className="neu-inset p-8 text-on-surface-variant">
                  No matches were found for this profile. Please check the
                  official government portals for the latest eligibility rules.
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {result.matches.map((s, index) => (
                  <article
                    key={s._id || s.id || index}
                    className="neu-raised p-8 flex flex-col gap-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-title-md text-primary">
                        {s.id === "STATE-TOPUP-12"
                          ? stateSchemeName(result.profile.state)
                          : s.name || "Government Health Scheme"}
                      </h3>

                      {s.badge && (
                        <span className="neu-inset rounded-full px-2.5 py-0.5 text-caption text-primary text-right shrink-0">
                          {s.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-body-sm text-on-surface-variant">
                      {s.desc ||
                        s.description ||
                        "Please check the official portal for complete scheme details."}
                    </p>

                    <div className="neu-inset p-5">
                      <span className="text-label-sm text-on-surface-variant flex items-center gap-1.5 mb-2">
                        <Icon
                          name="checklist"
                          className="text-[16px] text-primary"
                        />
                        Documents to keep ready
                      </span>

                      {Array.isArray(s.docs) && s.docs.length > 0 ? (
                        <ul className="text-body-sm text-on-surface list-disc pl-5 flex flex-col gap-0.5">
                          {s.docs.map((d, docIndex) => (
                            <li key={docIndex}>{d}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-body-sm text-on-surface-variant">
                          Check the official scheme portal for required documents.
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <span className="text-caption text-outline">
                        {Array.isArray(s.helpline) ? (
                          <>
                            {s.helpline[0]}
                            {s.helpline[1] && (
                              <>
                                :{" "}
                                <strong className="text-on-surface">
                                  {s.helpline[1]}
                                </strong>
                              </>
                            )}
                          </>
                        ) : (
                          s.helpline || "Helpline information unavailable"
                        )}
                      </span>

                      {s.link && (
                        <a
                          href={s.link}
                          target="_blank"
                          rel="noreferrer"
                          className="neu-btn neu-btn-sm no-print"
                        >
                          Official Portal
                          <Icon
                            name="open_in_new"
                            className="text-[16px]"
                          />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              <p className="text-caption text-outline flex items-start gap-1.5">
                <Icon
                  name="info"
                  className="text-[16px]"
                />

                Results are indicative. Final eligibility is decided by the
                scheme authority — please verify on the official portal or at
                your nearest Jan Seva Kendra / CSC.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}