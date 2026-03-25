// src/utils/icons.ts
import { IconType } from "react-icons";

import {
  FiHome,
  FiSearch,
  FiCompass,
  FiFilm,
  FiMessageSquare,
  FiHeart,
  FiPlusSquare,
  FiUser,
  FiMoreHorizontal,
  FiBookmark,
  FiShare2,
  FiLogOut,
  FiSettings,
  FiBell,
  FiMail,
  FiCamera,
  FiEdit2,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiInfo,
  FiSun,
  FiMoon,
  FiStar,
  FiTrash2,
  FiEdit,
  FiSend,
  FiPaperclip,
  FiImage,
  FiVideo,
  FiMusic,
  FiSmile,
  FiThumbsUp,
  FiClock,
  FiCalendar,
  FiMapPin,
  FiLink,
  FiLock,
  FiUnlock,
  FiEye,
  FiEyeOff,
  FiUserPlus,
  FiUserMinus,
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiAtSign,
  FiKey,
  FiLogIn,
  FiMenu,
  FiRefreshCw,
  FiDownload,
  FiUpload,
  FiCopy,
  FiExternalLink
} from "react-icons/fi";

import {
  FaRegComment,
  FaRegHeart,
  FaRegBookmark,
  FaRegSmile,
  FaRegImages,
  FaRegUser,
  FaRegBell,
  FaRegClock,
  FaInstagram
} from "react-icons/fa";

import {
  IoMdNotificationsOutline,
  IoMdPhotos,
  IoMdVideocam,
  IoMdMusicalNote,
  IoMdSend,
  IoMdAdd,
  IoMdRemove,
  IoMdClose,
  IoMdCheckmark,
  IoMdMenu,
  IoMdMore
} from "react-icons/io";

import {
  RiUserFollowLine,
  RiUserUnfollowLine,
  RiUserSharedLine,
  RiUserSettingsLine,
  RiUserStarLine,
  RiUserHeartLine,
  RiChat1Line,
  RiChat3Line,
  RiHeart2Line,
  RiBookmarkLine,
  RiShareLine,
  RiShareForwardLine,
  RiInstagramLine,
  RiTwitterXLine,
  RiGithubLine,
  RiLinkedinLine
} from "react-icons/ri";

// Main Icons
export const Icons: Record<string, IconType> = {
  // Navigation
  Home: FiHome,
  Search: FiSearch,
  Explore: FiCompass,
  Reels: FiFilm,
  Messages: FiMessageSquare,
  Notifications: FiBell,
  Create: FiPlusSquare,
  Profile: FiUser,
  Menu: FiMenu,
  More: IoMdMore,

  // Actions
  Like: FiHeart,
  Liked: RiHeart2Line,
  Comment: RiChat1Line,
  Share: FiShare2,
  Save: FiBookmark,
  Saved: RiBookmarkLine,
  Edit: FiEdit,
  Delete: FiTrash2,
  Report: FiAlertCircle,
  Follow: RiUserFollowLine,
  Following: RiUserSharedLine,
  Unfollow: RiUserUnfollowLine,

  // Auth
  Login: FiLogIn,
  Logout: FiLogOut,
  Register: FiUserPlus,
  Email: FiMail,
  Password: FiLock,
  Username: FiAtSign,

  // Media
  Image: FiImage,
  Video: FiVideo,
  Camera: FiCamera,
  Gallery: FaRegImages,
  Audio: FiMusic,

  // UI
  Close: FiX,
  Check: FiCheck,
  Alert: FiAlertCircle,
  Info: FiInfo,
  Settings: FiSettings,
  Sun: FiSun,
  Moon: FiMoon,
  Star: FiStar,
  Clock: FiClock,
  Calendar: FiCalendar,
  Location: FiMapPin,
  Link: FiLink,

  // Arrows
  ArrowLeft: FiChevronLeft,
  ArrowRight: FiChevronRight,
  ArrowUp: FiChevronUp,
  ArrowDown: FiChevronDown,

  // Social
  Instagram: FaInstagram,

  // Status
  Online: FiUserCheck,
  Offline: FiUserX,
  Busy: FiClock,

  // Reactions
  Smile: FiSmile,
  ThumbUp: FiThumbsUp,
  Heart: FiHeart,
  HeartFill: RiHeart2Line,

  // Misc
  Send: FiSend,
  Attach: FiPaperclip,
  Copy: FiCopy,
  Download: FiDownload,
  Upload: FiUpload,
  Refresh: FiRefreshCw,
  External: FiExternalLink,
  Eye: FiEye,
  EyeOff: FiEyeOff,
  User: FiUser,
  Users: FiUsers,
  UserCheck: FiUserCheck,
  UserFollow: RiUserFollowLine,
  Notification: IoMdNotificationsOutline
};

// Post Icons
export const PostIcons: Record<string, IconType> = {
  Like: FiHeart,
  Comment: FaRegComment,
  Share: RiShareLine,
  Save: RiBookmarkLine,
  More: FiMoreHorizontal
};

// Nav Icons
export const NavIcons: Record<string, IconType> = {
  Home: FiHome,
  Search: FiSearch,
  Explore: FiCompass,
  Reels: FiFilm,
  Messages: FiMessageSquare,
  Notifications: IoMdNotificationsOutline,
  Create: IoMdAdd,
  Profile: FiUser
};

// Auth Icons
export const AuthIcons: Record<string, IconType> = {
  Email: FiMail,
  Password: FiLock,
  User: FiUser,
  Bio: FiEdit2,
  Camera: FiCamera
};