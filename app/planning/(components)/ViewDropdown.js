"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { changeURLParam } from "../../../lib/navigation";
import { FiliereView, FormateurView } from "./CalendarViews";

const views = {
  filiere: FiliereView,
  formateur: FormateurView,
};

export default function ViewDropdown({ view: viewParam }) {
  const router = useRouter();
  const params = useSearchParams();
  const path = usePathname();

  const view =
    viewParam && views.hasOwnProperty(viewParam)
      ? views[viewParam]
      : views.filiere;

  const viewActions = Object.keys(views).map((k) => {
    return {
      label: views[k].label,
      onClick: () =>
        router.replace(
          changeURLParam({ params, path, newParams: { view: k } })
        ),
      selected: view == views[k],
    };
  });

  return (
    <Dropdown
      label="Changer de vue"
      actions={viewActions}
      variant="outlined"
      color="ajcBlue"
    />
  );
}
