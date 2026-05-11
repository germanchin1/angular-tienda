import { supabase } from '../config/supabase.js'

export const register = async (req, res) => {
  const { email, password, full_name, is_admin = false } = req.body
  console.log('Intento de registro:', { email, full_name, is_admin })

  if (!email || !password || !full_name) {
    return res.status(400).json({ error: 'Email, contraseña y nombre son obligatorios' })
  }

  const requestedRole = is_admin ? 'admin' : 'user'

  // 1. Crear el usuario como admin para evitar confirmaciones de email si no es necesario
  // y asegurar que se guardan los metadatos.
  const { data: userData, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { full_name, role: requestedRole },
    email_confirm: true
  })

  if (createError) {
    console.error('Error al crear usuario:', createError.message)
    return res.status(400).json({ error: createError.message })
  }

  // 2. Iniciar sesión automáticamente para obtener el token
  const { data: sessionData, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (loginError) {
    // Si falla el login automático, al menos el usuario se creó.
    return res.status(201).json({ 
      message: 'Usuario creado, pero no se pudo iniciar sesión automáticamente',
      user: {
        id: userData.user.id,
        email: userData.user.email,
        full_name: userData.user.user_metadata.full_name,
        role: userData.user.user_metadata.role
      }
    })
  }

  res.status(201).json({
    message: 'Usuario creado e iniciado sesión correctamente',
    access_token: sessionData.session.access_token,
    refresh_token: sessionData.session.refresh_token,
    user: {
      id: sessionData.user.id,
      email: sessionData.user.email,
      full_name: sessionData.user.user_metadata.full_name,
      role: sessionData.user.user_metadata.role
    }
  })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' })
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return res.status(401).json({ error: 'Credenciales incorrectas' })
  res.json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    user: {
      id: data.user.id,
      email: data.user.email,
      full_name: data.user.user_metadata.full_name,
      role: data.user.user_metadata.role
    }
  })
}

export const getProfile = async (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    full_name: req.user.user_metadata.full_name,
    role: req.user.user_metadata.role
  })
}