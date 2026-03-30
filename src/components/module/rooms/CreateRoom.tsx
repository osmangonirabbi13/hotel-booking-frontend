/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAmenities } from "@/hooks/Amenities/useAmenities";
import { useBedTypes } from "@/hooks/BadType/useBedTypes";
import { useExtraServices } from "@/hooks/ExtraServices/useExtraServices";
import { useRoomCategories } from "@/hooks/roomCategory/useRoomCategories";
import { useCreateRooms } from "@/hooks/rooms/useCreateRooms";
import Image from "next/image";

import { useRef, useState } from "react";
import { toast } from "sonner";

// ─── Toggle ──────────────────────────────────────────────────────────────────
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: checked ? "#22c55e" : "#d1d5db",
        position: "relative",
        cursor: "pointer",
        transition: "background .2s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: checked ? 22 : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          transition: "left .2s",
          boxShadow: "0 1px 3px rgba(0,0,0,.2)",
        }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CreateRoom() {
  const { mutate: handleCreateRoom, isPending } = useCreateRooms();

  const { data: categories } = useRoomCategories();
  const { data: bedTypes } = useBedTypes();
  const { data: amenitiesList } = useAmenities();
  const { data: servicesList } = useExtraServices();

  const [form, setForm] = useState<any>({
    rent: "",
    totalUnits: "",
    roomSize: "",
    numberOfBaths: "",
    maxGuests: "",
    maxAdults: "",
    maxChildren: "",
    categoryId: "",
    bedTypeId: "",
    isEventSpace: false,
    isFeatured: false,
    isActive: false,
    enableDynamicPricing: false,
    roomTitle: "",
    featuredTitle: "",
    description: "",
    seoTitle: "",
    seoDescription: "",
  });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Featured image
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredPreview, setFeaturedPreview] = useState<string | null>(null);

  // Slider images
  const [sliderImages, setSliderImages] = useState<File[]>([]);
  const [sliderPreviews, setSliderPreviews] = useState<string[]>([]);

  const featRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  const set = (k: string, v: any) =>
    setForm((p: any) => ({ ...p, [k]: v }));

  const toggleItem = (
    list: string[],
    setList: any,
    val: string
  ) => {
    setList((prev: string[]) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFeaturedImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setFeaturedPreview(url);
    } else {
      setFeaturedPreview(null);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSliderImages((prev) => [...prev, ...files]);
    const urls = files.map((f) => URL.createObjectURL(f));
    setSliderPreviews((prev) => [...prev, ...urls]);
  };

  const removeSliderImage = (idx: number) => {
    setSliderImages((prev) => prev.filter((_, i) => i !== idx));
    setSliderPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(null);
    setFeaturedPreview(null);
    if (featRef.current) featRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!featuredImage) return toast.error("Please upload a featured image");

    // ── Build the JSON data object (all non-file fields)
    const data = {
      rent:            Number(form.rent),
      totalUnits:      Number(form.totalUnits),
      roomSize:        form.roomSize     ? Number(form.roomSize)     : undefined,
      numberOfBaths:   Number(form.numberOfBaths),
      maxGuests:       Number(form.maxGuests),
      maxAdults:       form.maxAdults    ? Number(form.maxAdults)    : undefined,
      maxChildren:     form.maxChildren  ? Number(form.maxChildren)  : undefined,
      categoryId:      form.categoryId,
      bedTypeId:       form.bedTypeId,
      isEventSpace:    form.isEventSpace,
      isFeatured:      form.isFeatured,
      isActive:        form.isActive,
      enableDynamicPricing: form.enableDynamicPricing,
      roomTitle:       form.roomTitle    || undefined,
      featuredTitle:   form.featuredTitle || undefined,
      description:     form.description  || undefined,
      seoTitle:        form.seoTitle     || undefined,
      seoDescription:  form.seoDescription || undefined,
      amenityIds:      selectedAmenities,
      extraServiceIds: selectedServices,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));          // ← single JSON field
    formData.append("featuredImage", featuredImage);         // ← file
    sliderImages.forEach((file) => formData.append("sliderImages", file)); // ← files

    handleCreateRoom(formData as any);
  };

  // ── Styles ─────────────────────────────────────────────────────────────────
  const s: any = {
    page: {
      fontFamily: "'Inter', sans-serif",
      background: "#f0f0f0",
      minHeight: "100vh",
      padding: "28px 24px",
      color: "#111",
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: 700,
      marginBottom: 24,
      color: "#111",
    },
    card: {
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 4,
      marginBottom: 20,
    },
    cardHeader: {
      padding: "12px 20px",
      borderBottom: "1px solid #e5e7eb",
      fontSize: 11,
      fontWeight: 700,
      color: "#555",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    cardBody: { padding: "20px 20px" },
    label: {
      display: "block",
      fontSize: 12,
      fontWeight: 500,
      color: "#444",
      marginBottom: 6,
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #e0e0e0",
      borderRadius: 4,
      fontSize: 13,
      background: "#f9f9f9",
      color: "#111",
      outline: "none",
      boxSizing: "border-box" as const,
    },
    select: {
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #e0e0e0",
      borderRadius: 4,
      fontSize: 13,
      background: "#f9f9f9",
      color: "#111",
      outline: "none",
      boxSizing: "border-box" as const,
      appearance: "none" as const,
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 12px center",
    },
    checkRow: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 10,
      cursor: "pointer",
      fontSize: 13,
      color: "#333",
    },
    toggleRow: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 16,
    },
    toggleLabel: { fontSize: 13, color: "#333", minWidth: 160 },
    dropzone: {
      border: "1.5px dashed #d1d5db",
      borderRadius: 4,
      padding: "36px",
      textAlign: "center" as const,
      cursor: "pointer",
      color: "#9ca3af",
      fontSize: 13,
      background: "#fafafa",
      transition: "border-color .2s",
    },
    publishBtn: {
      background: "#22c55e",
      color: "#fff",
      border: "none",
      padding: "11px 28px",
      borderRadius: 4,
      fontWeight: 600,
      fontSize: 14,
      cursor: "pointer",
    },
    // Image preview
    previewImg: {
      width: "100%",
      height: "200px",
      objectFit: "cover" as const,
      borderRadius: 4,
      display: "block",
    },
    previewWrap: {
      position: "relative" as const,
      borderRadius: 4,
      overflow: "hidden",
      border: "1px solid #e0e0e0",
    },
    removeBtn: {
      position: "absolute" as const,
      top: 6,
      right: 6,
      background: "rgba(0,0,0,0.55)",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      width: 26,
      height: 26,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: 14,
      lineHeight: 1,
    },
    sliderGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 12,
      marginTop: 12,
    },
    sliderThumb: {
      position: "relative" as const,
      borderRadius: 4,
      overflow: "hidden",
      border: "1px solid #e0e0e0",
    },
    sliderThumbImg: {
      width: "100%",
      height: 100,
      objectFit: "cover" as const,
      display: "block",
    },
  };

  return (
    <div style={s.page}>
      <h2 style={s.pageTitle}>Create Room</h2>

      <form onSubmit={handleSubmit}>
        {/* ── ROOM DETAILS ── */}
        <div style={s.card}>
          <div style={s.cardHeader}>Room Details</div>
          <div style={s.cardBody}>
            {/* Row 1 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div>
                <label style={s.label}>Rent/Night (In USD) *</label>
                <input style={s.input} placeholder="Enter Rent Amount" type="number" value={form.rent} onChange={(e) => set("rent", e.target.value)} required />
              </div>
              <div>
                <label style={s.label}>Number of rooms *</label>
                <input style={s.input} placeholder="Enter Room quantity" type="number" value={form.totalUnits} onChange={(e) => set("totalUnits", e.target.value)} required />
              </div>
            </div>

            {/* Row 2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div>
                <label style={s.label}>Room Length (Square Feet) *</label>
                <input style={s.input} placeholder="Enter Room Length" type="number" value={form.roomSize} onChange={(e) => set("roomSize", e.target.value)} required />
              </div>
              <div>
                <label style={s.label}>Number of baths *</label>
                <input style={s.input} placeholder="Enter Baths Number" type="number" value={form.numberOfBaths} onChange={(e) => set("numberOfBaths", e.target.value)} required />
              </div>
            </div>

            {/* Row 3 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div>
                <label style={s.label}>Max Guests *</label>
                <input style={s.input} placeholder="Enter Max Guests" type="number" value={form.maxGuests} onChange={(e) => set("maxGuests", e.target.value)} required />
              </div>
              <div>
                <label style={s.label}>Adult Guests *</label>
                <input style={s.input} placeholder="Enter Adult Guests" type="number" value={form.maxAdults} onChange={(e) => set("maxAdults", e.target.value)} required />
              </div>
              <div>
                <label style={s.label}>Child Guests *</label>
                <input style={s.input} placeholder="Enter Child Guests" type="number" value={form.maxChildren} onChange={(e) => set("maxChildren", e.target.value)} required />
              </div>
            </div>

            {/* Row 4 – Category & Bed Type */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              <div>
                <label style={s.label}>Category *</label>
                <select style={s.select} value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)} required>
                  <option value="">Select Category</option>
                  {categories?.map((c: any, i: number) => (
                    <option key={c._id ?? c.id ?? i} value={c._id ?? c.id ?? ""}>{c.name ?? c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={s.label}>Bed Type *</label>
                <select style={s.select} value={form.bedTypeId} onChange={(e) => set("bedTypeId", e.target.value)} required>
                  <option value="">Select Bed Type</option>
                  {bedTypes?.map((b: any, i: number) => (
                    <option key={b._id ?? b.id ?? i} value={b._id ?? b.id ?? ""}>{b.name ?? b.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Amenities */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ ...s.label, marginBottom: 12 }}>Amenities</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
                {amenitiesList?.map((a: any) => {
                  const id = a._id ?? a.id ?? String(a.name);
                  const name = a.name ?? a.title ?? "Unknown";
                  return (
                    <label key={id} style={s.checkRow}>
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(id)}
                        onChange={() =>
                          setSelectedAmenities((prev) =>
                            prev.includes(id)
                              ? prev.filter((i) => i !== id)
                              : [...prev, id]
                          )
                        }
                        style={{ accentColor: "#22c55e", width: 15, height: 15, cursor: "pointer" }}
                      />
                      <span style={{ fontSize: 13, color: "#333" }}>{name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Extra Services */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ ...s.label, marginBottom: 12 }}>Extra Services</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
                {servicesList?.map((sv: any) => {
                  const id = sv.id ?? sv.id ?? String(sv.serviceName);
                  const name = sv.serviceName ?? sv.serviceName ?? "Unknown";
                  const price = sv.serviceAmount ?? sv.serviceAmount;
                  return (
                    <label key={id} style={s.checkRow}>
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(id)}
                        onChange={() =>
                          setSelectedServices((prev) =>
                            prev.includes(id)
                              ? prev.filter((i) => i !== id)
                              : [...prev, id]
                          )
                        }
                        style={{ accentColor: "#22c55e", width: 15, height: 15, cursor: "pointer" }}
                      />
                      <span style={{ fontSize: 13, color: "#333" }}>{name} - ${price} USD</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Toggles */}
            <div style={{ marginTop: 8 }}>
              {([
                ["Is Event Space:", "isEventSpace"],
                ["Is Featured In Home Page:", "isFeatured"],
                ["Is Active:", "isActive"],
                ["Enable Dynamic Pricing:", "enableDynamicPricing"],
              ] as [string, string][]).map(([title, key]) => (
                <div key={key} style={s.toggleRow}>
                  <span style={s.toggleLabel}>{title}</span>
                  <Toggle checked={form[key]} onChange={(v) => set(key, v)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div style={s.card}>
          <div style={s.cardBody}>
            {/* Room Title & Featured Title */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div>
                <label style={s.label}>Room Title *</label>
                <input style={s.input} placeholder="Enter Room Title" value={form.roomTitle} onChange={(e) => set("roomTitle", e.target.value)} required />
              </div>
              <div>
                <label style={s.label}>Featured Title *</label>
                <input style={s.input} placeholder="Enter Featured Title" value={form.featuredTitle} onChange={(e) => set("featuredTitle", e.target.value)} required />
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: 20 }}>
              <label style={s.label}>Description</label>
              <textarea
                style={{ ...s.input, minHeight: 160, resize: "vertical", lineHeight: 1.6 }}
                placeholder="Enter room description..."
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>

            {/* SEO */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <label style={s.label}>SEO Title</label>
                <input style={s.input} placeholder="Enter SEO Title" value={form.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} />
              </div>
              <div>
                <label style={s.label}>SEO Description</label>
                <input style={s.input} placeholder="Enter SEO Description" value={form.seoDescription} onChange={(e) => set("seoDescription", e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* ── ROOM IMAGES ── */}
        <div style={s.card}>
          <div style={s.cardHeader}>Room Images</div>
          <div style={s.cardBody}>
            {/* Featured Image */}
            <div style={{ marginBottom: 24 }}>
              <label style={s.label}>Upload featured image *</label>

              {featuredPreview ? (
                <div style={{ ...s.previewWrap, position: "relative", height: 200 }}>
                  <Image src={featuredPreview!} alt="Featured Preview" fill style={{ objectFit: "cover" }} />
                  <button
                    type="button"
                    onClick={removeFeaturedImage}
                    style={s.removeBtn}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div style={s.dropzone} onClick={() => featRef.current?.click()}>
                  click here to select a file
                </div>
              )}

              <input
                type="file"
                ref={featRef}
                hidden
                accept="image/*"
                onChange={handleFeaturedChange}
              />
            </div>

            {/* Slider Images */}
            <div>
              <label style={s.label}>Upload Slider images (1070x822) *</label>

              <div style={s.dropzone} onClick={() => sliderRef.current?.click()}>
                click here to select files
              </div>
              <input
                type="file"
                ref={sliderRef}
                hidden
                accept="image/*"
                multiple
                onChange={handleSliderChange}
              />

              {sliderPreviews.length > 0 && (
                <div style={s.sliderGrid}>
                  {sliderPreviews.map((url, idx) => (
                    <div key={idx} style={{ ...s.sliderThumb, position: "relative", height: 100 }}>
                      <Image src={url} alt={`Slide ${idx + 1}`} fill style={{ objectFit: "cover" }} />
                      <button
                        type="button"
                        onClick={() => removeSliderImage(idx)}
                        style={{ ...s.removeBtn, top: 4, right: 4, width: 22, height: 22, fontSize: 12 }}
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={{ ...s.publishBtn, opacity: isPending ? 0.6 : 1 }}
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Publish"}
        </button>
      </form>
    </div>
  );
}