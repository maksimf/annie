export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      entertainers: {
        Row: {
          booking_policy: string | null
          contact_phone: string | null
          description: string | null
          email: string | null
          id: number
          name: string | null
          photo_url: string | null
          price: string | null
          services: string | null
          status: string | null
          website: string | null
        }
        Insert: {
          booking_policy?: string | null
          contact_phone?: string | null
          description?: string | null
          email?: string | null
          id?: number
          name?: string | null
          photo_url?: string | null
          price?: string | null
          services?: string | null
          status?: string | null
          website?: string | null
        }
        Update: {
          booking_policy?: string | null
          contact_phone?: string | null
          description?: string | null
          email?: string | null
          id?: number
          name?: string | null
          photo_url?: string | null
          price?: string | null
          services?: string | null
          status?: string | null
          website?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string | null
          id: number
          name: string | null
          postcode: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          postcode?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          postcode?: string | null
        }
        Relationships: []
      }
      leads_entertainers: {
        Row: {
          created_at: string
          entertainer_id: number | null
          id: number
          lead_id: number | null
        }
        Insert: {
          created_at?: string
          entertainer_id?: number | null
          id?: number
          lead_id?: number | null
        }
        Update: {
          created_at?: string
          entertainer_id?: number | null
          id?: number
          lead_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_leads_entertainers_entertainer_id_fkey"
            columns: ["entertainer_id"]
            isOneToOne: false
            referencedRelation: "entertainers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_leads_entertainers_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads_venues: {
        Row: {
          created_at: string
          id: number
          lead_id: number | null
          venue_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          lead_id?: number | null
          venue_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          lead_id?: number | null
          venue_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_leads_venues_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_leads_venues_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          accessibility: string | null
          booking_duration: string | null
          capacity: string | null
          catering: string | null
          comments: string | null
          contact_phone: string | null
          days_for_rent: string | null
          description: string | null
          email: string | null
          equipment: string | null
          facilities: string | null
          id: number
          location: string | null
          music: string | null
          name: string | null
          parking: string | null
          policy: string | null
          price: string | null
          rooms: string | null
          status: string | null
          website: string | null
        }
        Insert: {
          accessibility?: string | null
          booking_duration?: string | null
          capacity?: string | null
          catering?: string | null
          comments?: string | null
          contact_phone?: string | null
          days_for_rent?: string | null
          description?: string | null
          email?: string | null
          equipment?: string | null
          facilities?: string | null
          id?: number
          location?: string | null
          music?: string | null
          name?: string | null
          parking?: string | null
          policy?: string | null
          price?: string | null
          rooms?: string | null
          status?: string | null
          website?: string | null
        }
        Update: {
          accessibility?: string | null
          booking_duration?: string | null
          capacity?: string | null
          catering?: string | null
          comments?: string | null
          contact_phone?: string | null
          days_for_rent?: string | null
          description?: string | null
          email?: string | null
          equipment?: string | null
          facilities?: string | null
          id?: number
          location?: string | null
          music?: string | null
          name?: string | null
          parking?: string | null
          policy?: string | null
          price?: string | null
          rooms?: string | null
          status?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
