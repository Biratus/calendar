"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { changeURLParam } from "../../../lib/navigation";
import { FiliereView, FormateurView } from "./CalendarViews";

const views = {};
views[FiliereView.key] = FiliereView;
views[FormateurView.key] = FormateurView;

export default function ViewDropdown({ view: viewParam = FiliereView.key  }) {
  const router = useRouter();
  const params = useSearchParams();
  const path = usePathname();

  const view =views[viewParam]

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
