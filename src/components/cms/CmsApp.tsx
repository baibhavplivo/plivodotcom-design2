import { useState, useEffect, useCallback } from "react";
import { isAuthenticated } from "./cms-api";
import type { CmsView } from "./cms-types";
import CmsLogin from "./CmsLogin";
import CmsDashboard from "./CmsDashboard";
import CmsEditor from "./CmsEditor";

function parseHash(): { view: CmsView; slug?: string } {
  const hash = window.location.hash.replace("#", "");

  if (hash.startsWith("edit/")) {
    return { view: "editor", slug: hash.replace("edit/", "") };
  }
  if (hash === "new") {
    return { view: "editor", slug: undefined };
  }
  if (hash === "dashboard") {
    return { view: "dashboard" };
  }
  return { view: "login" };
}

export default function CmsApp() {
  const [view, setView] = useState<CmsView>("login");
  const [editSlug, setEditSlug] = useState<string | undefined>();

  // Check auth on mount
  useEffect(() => {
    if (isAuthenticated()) {
      const { view: hashView, slug } = parseHash();
      if (hashView === "login") {
        window.location.hash = "#dashboard";
        setView("dashboard");
      } else {
        setView(hashView);
        setEditSlug(slug);
      }
    } else {
      window.location.hash = "#login";
      setView("login");
    }
  }, []);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (!isAuthenticated()) {
        setView("login");
        return;
      }
      const { view: hashView, slug } = parseHash();
      setView(hashView);
      setEditSlug(slug);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = useCallback((hash: string) => {
    window.location.hash = hash;
  }, []);

  const handleLoginSuccess = useCallback(() => {
    navigate("#dashboard");
    setView("dashboard");
  }, [navigate]);

  const handleEdit = useCallback(
    (slug: string) => {
      navigate(`#edit/${slug}`);
    },
    [navigate]
  );

  const handleNew = useCallback(() => {
    navigate("#new");
  }, [navigate]);

  const handleBack = useCallback(() => {
    navigate("#dashboard");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    navigate("#login");
    setView("login");
  }, [navigate]);

  switch (view) {
    case "login":
      return <CmsLogin onSuccess={handleLoginSuccess} />;
    case "dashboard":
      return (
        <CmsDashboard
          onEdit={handleEdit}
          onNew={handleNew}
          onLogout={handleLogout}
        />
      );
    case "editor":
      return <CmsEditor slug={editSlug} onBack={handleBack} />;
    default:
      return <CmsLogin onSuccess={handleLoginSuccess} />;
  }
}
