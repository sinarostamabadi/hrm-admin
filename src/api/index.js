import { AuthApi } from "./auth";
import { CompanyApi } from "./company/Index";
import { CompanyProjectApi } from "./companyProject/Index";
import { CompanyPositionApi } from "./companyPosition/Index";
import { PreCandidateApi } from "./preCandidate/Index";
import { ServiceApi } from "./service/Index";
import { CandidateApi } from "./candidate";
import { EmployeeApi } from "./employee";
import { CandidatePositionApi } from "./candidatePosition";

// ========== Settings ==========
import { SettingsApi } from "./settings";

export const api = {
  AuthApi,
  CompanyApi,
  CompanyProjectApi,
  CompanyPositionApi,
  PreCandidateApi,
  ServiceApi,
  CandidateApi,
  EmployeeApi,
  CandidatePositionApi,

  // ========== Settings ==========
  SettingsApi,
};
