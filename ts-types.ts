export interface IIdWithDate {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface IAmenity extends IIdWithDate {
  name: string;
  icon_url: string;
  icon_name: string;
  icon_provider: any;
}

export interface IWorkspaceBanner extends IIdWithDate {
  title: string;
  sub_title: string;
}

export interface IWorkspaceImage extends IIdWithDate {
  image_url: string;
}

export interface IWorkspacePlan extends IWorkspaceBanner {
  duration: number;
  location_type: string;
  cost: number;
  space_type: string;
}

export interface IWeeklySchedule extends IIdWithDate {
  day: string;
  opens_at: string;
  closes_at: string;
}

export interface IWorkspaceAddress extends IIdWithDate {
  address: string;
  short_address: string;
  lat: number;
  long: number;
  location_id: string;
}

export interface IWorkspace extends IIdWithDate {
  name: string;
  description: string;
  key: number;
  profile_image: string;
  amenities: IAmenity[];
  banners: IWorkspaceBanner[];
  images: IWorkspaceImage[];
  plans: IWorkspacePlan[];
  addresses: IWorkspaceAddress;
  per_day: string;
  address: string;
  short_address: string;
  opens_at: string;
  closes_at: string;
  image_urls?: string[];
}

export interface CheckboxType {
  val: string;
  displayName: string;
  isChecked: boolean;
}

export interface ISelectedFilters {
  propertyType: CheckboxType[];
  spaceType: CheckboxType[];
  amenities: string[];
  amenitiesQueried: boolean;
  duration: string;
  price: string;
  distance: string;
  seatCapacity: string;
}

export interface IWorkspacePlanProps {
  plan: IWorkspacePlan;
  plans: IWorkspacePlan[];
  back: any;
  onSpaceTypeSelected: any;
}

export interface IWorkspaceBannerProps {
  banner: IWorkspaceBanner;
}

export interface IWorkspaceAmenityProps {
  amenity: IAmenity;
}

export interface IWorkspaceSpaceTypePlanProps {
  plans: IWorkspacePlan[];
  back: any;
  spaceType: string;
  availedFreePlanIds: number[];
  workspace: IWorkspace;
  onBackClickListener?: any;
  onPurchaseClickListener: any;
}

export interface IUserProfessionalDetailsProps {
  details: any;
  profileImageUrl: string | null;
  name: string | null;
}

export interface IRecentlySearchedWorkspacesListProps {
  workspaces: any;
  onRedirectToIconClicked: any;
}

export interface IWorkspaceListCardProps {
  workspace: any;
  onRedirectToIconClicked: any;
}

export interface ICheckinCardProps {
  data: any;
}

export interface ICheckinCalendarProps {
  dateData: any;
  onDateChange: any;
  onStartMonthChanged: any;
}

export interface ICheckinCalendarMonthSectionProps {
  goToPrevMonth: any;
  goToNextMonth: any;
  monthName: string;
  year: number;
}

export interface ICheckinListProps {
  userCheckinHistory: any;
  onViewAllClicked?: any;
  showLimited?: boolean;
}
export interface IPurchasesListProps {
  purchases: any;
  redirectToPurchaseDetail: any;
}

export interface IPurchaseCardProps {
  purchase: any;
  redirectToPurchaseDetail: any;
}

export interface IFAQCardProps {
  faq: any;
}

export interface ICouponCodeCardProps {
  couponCode: any;
}

export interface ICouponCodesListProps {
  couponCodes: any;
}

export interface ShowSubscriptionsProps {
  activeSubscriptions: any;
  expiredSubscriptions: any;
  subscriptonCardButtonClicked: any;
}

export interface IWorkspaceWeeklyScheduleProps {
  workspaceId: number;
}

export interface IWorkspaceScheduleProps {
  workspaceId: number;
}

export interface IWorkspaceDetailsAddress {
  address: string;
}

export interface IWorkspaceNumberOfSeatsProps {
  numberOfSeats: number;
  removeSeat: any;
  addSeat: any;
}

export interface ICalendarProps {
  onDateChange: any;
  plan: any;
}

export interface ICouponCodeProps {
  applyCode: any;
  removeCode: any;
}

export interface IWorkspaceTypeProps {
  type: {
    id: number;
    name: string;
    displayName?: string;
  };
  filters?: any;
  searchTerm?: string | null;
  latLong: string | null;
  onNoResultsExploreButtonClicked: any;
  showDetailsClicked: any;
}

export interface IWorkspaceProps {
  type?: any;
  workspaces: IWorkspace[];
  showDetailsClicked: any;
}

export interface IWorkspaceCard {
  workspace: IWorkspace;
  currentWorkspaceId?: number;
  single: boolean;
  alone: boolean;
  showDetailsClicked: any;
}

export interface ICheckboxProps {
  isChecked: boolean;
  text: string;
  type: string;
  value: string;
  checkboxChangedListener: any;
}

export interface ImageSliderProps {
  workspace: any;
  styleProps: any;
  location?: string;
  currentWorkspaceId?: number;
}
