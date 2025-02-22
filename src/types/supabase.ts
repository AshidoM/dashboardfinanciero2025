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
      administradores_gestores: {
        Row: {
          contrasena: string
          correo: string
          id: number
          nombre_completo: string
          rol: Database["public"]["Enums"]["rol_enum"]
          ubicacion: string | null
        }
        Insert: {
          contrasena: string
          correo: string
          id?: number
          nombre_completo: string
          rol: Database["public"]["Enums"]["rol_enum"]
          ubicacion?: string | null
        }
        Update: {
          contrasena?: string
          correo?: string
          id?: number
          nombre_completo?: string
          rol?: Database["public"]["Enums"]["rol_enum"]
          ubicacion?: string | null
        }
        Relationships: []
      }
      caracteristicas_planes: {
        Row: {
          caracteristica: string
          id: number
          plan_id: number | null
        }
        Insert: {
          caracteristica: string
          id?: number
          plan_id?: number | null
        }
        Update: {
          caracteristica?: string
          id?: number
          plan_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "caracteristicas_planes_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "planes"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias: {
        Row: {
          id: number
          nombre: string
        }
        Insert: {
          id?: number
          nombre: string
        }
        Update: {
          id?: number
          nombre?: string
        }
        Relationships: []
      }
      cuentas: {
        Row: {
          banco: Database["public"]["Enums"]["banco_enum"]
          descripcion: string | null
          fecha_creacion: string
          id: number
          nombre_cuenta: string
          saldo: number
        }
        Insert: {
          banco?: Database["public"]["Enums"]["banco_enum"]
          descripcion?: string | null
          fecha_creacion?: string
          id?: number
          nombre_cuenta: string
          saldo?: number
        }
        Update: {
          banco?: Database["public"]["Enums"]["banco_enum"]
          descripcion?: string | null
          fecha_creacion?: string
          id?: number
          nombre_cuenta?: string
          saldo?: number
        }
        Relationships: []
      }
      movimientos: {
        Row: {
          cuenta_id: number
          descripcion: string | null
          fecha_movimiento: string
          id: number
          monto: number
          numero_operacion: number
          responsable: string | null
          subtipo: string
          tipo: string
          usuario: string
        }
        Insert: {
          cuenta_id: number
          descripcion?: string | null
          fecha_movimiento?: string
          id?: number
          monto: number
          numero_operacion?: number
          responsable?: string | null
          subtipo: string
          tipo: string
          usuario: string
        }
        Update: {
          cuenta_id?: number
          descripcion?: string | null
          fecha_movimiento?: string
          id?: number
          monto?: number
          numero_operacion?: number
          responsable?: string | null
          subtipo?: string
          tipo?: string
          usuario?: string
        }
        Relationships: []
      }
      perfiles: {
        Row: {
          contraseña: string
          email: string
          fecha_actualizacion: string
          fecha_creacion: string
          id: string
          nombre_completo: string
          telefono: string | null
        }
        Insert: {
          contraseña: string
          email: string
          fecha_actualizacion?: string
          fecha_creacion?: string
          id?: string
          nombre_completo: string
          telefono?: string | null
        }
        Update: {
          contraseña?: string
          email?: string
          fecha_actualizacion?: string
          fecha_creacion?: string
          id?: string
          nombre_completo?: string
          telefono?: string | null
        }
        Relationships: []
      }
      planes: {
        Row: {
          costo_adicional_inicial: number | null
          costo_adicional_mensual: number | null
          costo_mensual: number
          descripcion: string | null
          es_personalizado: boolean
          id: number
          limite_sitios_web: number
          nombre: string
        }
        Insert: {
          costo_adicional_inicial?: number | null
          costo_adicional_mensual?: number | null
          costo_mensual: number
          descripcion?: string | null
          es_personalizado?: boolean
          id?: number
          limite_sitios_web: number
          nombre: string
        }
        Update: {
          costo_adicional_inicial?: number | null
          costo_adicional_mensual?: number | null
          costo_mensual?: number
          descripcion?: string | null
          es_personalizado?: boolean
          id?: number
          limite_sitios_web?: number
          nombre?: string
        }
        Relationships: []
      }
      plantilla_categorias: {
        Row: {
          categoria_id: number
          plantilla_id: number
        }
        Insert: {
          categoria_id: number
          plantilla_id: number
        }
        Update: {
          categoria_id?: number
          plantilla_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plantilla_categorias_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantilla_categorias_plantilla_id_fkey"
            columns: ["plantilla_id"]
            isOneToOne: false
            referencedRelation: "plantillas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantilla_categorias_plantilla_id_fkey"
            columns: ["plantilla_id"]
            isOneToOne: false
            referencedRelation: "v_plantillas_completas"
            referencedColumns: ["id"]
          },
        ]
      }
      plantilla_tecnologias: {
        Row: {
          plantilla_id: number
          tecnologia_id: number
        }
        Insert: {
          plantilla_id: number
          tecnologia_id: number
        }
        Update: {
          plantilla_id?: number
          tecnologia_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "plantilla_tecnologias_plantilla_id_fkey"
            columns: ["plantilla_id"]
            isOneToOne: false
            referencedRelation: "plantillas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantilla_tecnologias_plantilla_id_fkey"
            columns: ["plantilla_id"]
            isOneToOne: false
            referencedRelation: "v_plantillas_completas"
            referencedColumns: ["id"]
          },
        ]
      }
      plantillas: {
        Row: {
          descripcion: string | null
          id: number
          imagen: string | null
          nombre: string
          url_vista_previa: string | null
        }
        Insert: {
          descripcion?: string | null
          id?: number
          imagen?: string | null
          nombre: string
          url_vista_previa?: string | null
        }
        Update: {
          descripcion?: string | null
          id?: number
          imagen?: string | null
          nombre?: string
          url_vista_previa?: string | null
        }
        Relationships: []
      }
      SW_Artistas: {
        Row: {
          apple_music_link: string | null
          contrasena: string
          correo: string
          created_at: string
          id: string
          nombre_artistico: string
          nombre_completo: string
          spotify_link: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          apple_music_link?: string | null
          contrasena: string
          correo: string
          created_at?: string
          id?: string
          nombre_artistico: string
          nombre_completo: string
          spotify_link?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          apple_music_link?: string | null
          contrasena?: string
          correo?: string
          created_at?: string
          id?: string
          nombre_artistico?: string
          nombre_completo?: string
          spotify_link?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      SW_Generos: {
        Row: {
          created_at: string
          id: string
          nombre: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          nombre: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          nombre?: string
          updated_at?: string
        }
        Relationships: []
      }
      SW_Idiomas: {
        Row: {
          created_at: string
          id: string
          nombre: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          nombre: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          nombre?: string
          updated_at?: string
        }
        Relationships: []
      }
      SW_Lanzamiento_Artistas: {
        Row: {
          artista_id: string
          created_at: string
          id: string
          lanzamiento_id: string
          role_description: string | null
          role_type: string
          updated_at: string
        }
        Insert: {
          artista_id: string
          created_at?: string
          id?: string
          lanzamiento_id: string
          role_description?: string | null
          role_type: string
          updated_at?: string
        }
        Update: {
          artista_id?: string
          created_at?: string
          id?: string
          lanzamiento_id?: string
          role_description?: string | null
          role_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_artista"
            columns: ["artista_id"]
            isOneToOne: false
            referencedRelation: "SW_Artistas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_lanzamiento"
            columns: ["lanzamiento_id"]
            isOneToOne: false
            referencedRelation: "SW_Lanzamientos"
            referencedColumns: ["id"]
          },
        ]
      }
      SW_Lanzamiento_Plataformas: {
        Row: {
          created_at: string
          id: string
          lanzamiento_id: string
          plataforma_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          lanzamiento_id: string
          plataforma_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          lanzamiento_id?: string
          plataforma_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_lp_lanzamiento"
            columns: ["lanzamiento_id"]
            isOneToOne: false
            referencedRelation: "SW_Lanzamientos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_lp_plataforma"
            columns: ["plataforma_id"]
            isOneToOne: false
            referencedRelation: "SW_Plataformas"
            referencedColumns: ["id"]
          },
        ]
      }
      SW_Lanzamientos: {
        Row: {
          audio_file_path: string | null
          casa_editorial: string | null
          compositor: string | null
          cover_file_path: string | null
          created_at: string
          derechos: number | null
          fecha_lanzamiento: string | null
          genero_id: string | null
          hora_lanzamiento: string | null
          id: string
          idioma_letras_id: string | null
          idioma_titulo_id: string | null
          is_explicito: boolean | null
          is_instrumental: boolean | null
          isrc: string | null
          letra: string | null
          letrista: string | null
          license_file_path: string | null
          license_type: string | null
          publicacion_admin: boolean | null
          sinc_global: boolean | null
          subgenero_id: string | null
          titulo: string
          titulo_ingles: string | null
          upc: string | null
          updated_at: string
          version: string | null
          with_license: boolean | null
        }
        Insert: {
          audio_file_path?: string | null
          casa_editorial?: string | null
          compositor?: string | null
          cover_file_path?: string | null
          created_at?: string
          derechos?: number | null
          fecha_lanzamiento?: string | null
          genero_id?: string | null
          hora_lanzamiento?: string | null
          id?: string
          idioma_letras_id?: string | null
          idioma_titulo_id?: string | null
          is_explicito?: boolean | null
          is_instrumental?: boolean | null
          isrc?: string | null
          letra?: string | null
          letrista?: string | null
          license_file_path?: string | null
          license_type?: string | null
          publicacion_admin?: boolean | null
          sinc_global?: boolean | null
          subgenero_id?: string | null
          titulo: string
          titulo_ingles?: string | null
          upc?: string | null
          updated_at?: string
          version?: string | null
          with_license?: boolean | null
        }
        Update: {
          audio_file_path?: string | null
          casa_editorial?: string | null
          compositor?: string | null
          cover_file_path?: string | null
          created_at?: string
          derechos?: number | null
          fecha_lanzamiento?: string | null
          genero_id?: string | null
          hora_lanzamiento?: string | null
          id?: string
          idioma_letras_id?: string | null
          idioma_titulo_id?: string | null
          is_explicito?: boolean | null
          is_instrumental?: boolean | null
          isrc?: string | null
          letra?: string | null
          letrista?: string | null
          license_file_path?: string | null
          license_type?: string | null
          publicacion_admin?: boolean | null
          sinc_global?: boolean | null
          subgenero_id?: string | null
          titulo?: string
          titulo_ingles?: string | null
          upc?: string | null
          updated_at?: string
          version?: string | null
          with_license?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_genero"
            columns: ["genero_id"]
            isOneToOne: false
            referencedRelation: "SW_Generos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_idioma_letras"
            columns: ["idioma_letras_id"]
            isOneToOne: false
            referencedRelation: "SW_Idiomas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_idioma_titulo"
            columns: ["idioma_titulo_id"]
            isOneToOne: false
            referencedRelation: "SW_Idiomas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_subgenero"
            columns: ["subgenero_id"]
            isOneToOne: false
            referencedRelation: "SW_Subgeneros"
            referencedColumns: ["id"]
          },
        ]
      }
      SW_MisArtistas: {
        Row: {
          apple_music_link: string | null
          created_at: string
          id: string
          nombre_artistico: string
          owner_id: string
          spotify_link: string | null
          updated_at: string
        }
        Insert: {
          apple_music_link?: string | null
          created_at?: string
          id?: string
          nombre_artistico: string
          owner_id: string
          spotify_link?: string | null
          updated_at?: string
        }
        Update: {
          apple_music_link?: string | null
          created_at?: string
          id?: string
          nombre_artistico?: string
          owner_id?: string
          spotify_link?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      SW_Plataformas: {
        Row: {
          created_at: string
          estimated_publish_days: number | null
          id: string
          logo_url: string | null
          nombre: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          estimated_publish_days?: number | null
          id?: string
          logo_url?: string | null
          nombre: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          estimated_publish_days?: number | null
          id?: string
          logo_url?: string | null
          nombre?: string
          updated_at?: string
        }
        Relationships: []
      }
      SW_Subgeneros: {
        Row: {
          created_at: string
          genero_id: string
          id: string
          nombre: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          genero_id: string
          id?: string
          nombre: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          genero_id?: string
          id?: string
          nombre?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_genero"
            columns: ["genero_id"]
            isOneToOne: false
            referencedRelation: "SW_Generos"
            referencedColumns: ["id"]
          },
        ]
      }
      tecnologias: {
        Row: {
          id: number
          imagen: string | null
          nombre: string
        }
        Insert: {
          id?: number
          imagen?: string | null
          nombre: string
        }
        Update: {
          id?: number
          imagen?: string | null
          nombre?: string
        }
        Relationships: []
      }
    }
    Views: {
      v_plantillas_completas: {
        Row: {
          categorias: string[] | null
          descripcion: string | null
          id: number | null
          imagen: string | null
          nombre: string | null
          tecnologias: Json[] | null
          url_vista_previa: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      apply_promo_code: {
        Args: {
          p_user_id: string
          p_plan_id: string
          p_promo_code: string
        }
        Returns: {
          success: boolean
          message: string
          final_price: number
        }[]
      }
    }
    Enums: {
      banco_enum: "Santander" | "HSBC" | "Efectivo"
      egreso_enum:
        | "Cheque"
        | "Salida Efectivo"
        | "Secretaria General"
        | "Secretaria de Finanzas"
        | "Oficial Mayor"
        | "Patrimonio Sindical"
        | "Regionales"
      rol_enum: "Administrador" | "Gestor"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
