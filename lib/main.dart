import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'admin_dashboard.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: const FirebaseOptions(
      apiKey: "AIzaSyBl2ET5y3N5yI5aYTgCOiRr0hcIxm4Zj1o", 
      appId: "1:263774634016:web:135ab74a3dd585acf0bc45",
      messagingSenderId: "263774634016",
      projectId: "launchbox-ea67f",
      databaseURL: "https://launchbox-ea67f-default-rtdb.firebaseio.com",
    ),
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LaunchBox Dashboard',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const AdminDashboardScreen(),
    );
  }
}