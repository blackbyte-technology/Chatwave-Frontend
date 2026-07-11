/**
 * Re-export auth utilities from the root-level auth config.
 * All imports from within src/ should use "@/src/auth".
 * The canonical config lives at the project root (auth.ts + auth.config.ts).
 */
export { handlers, auth, signIn, signOut } from "@/auth";
