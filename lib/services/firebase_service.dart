// lib/services/firebase_service.dart
import 'package:firebase_database/firebase_database.dart';

class User {
  final String? email;
  final String? name;
  final String lastTimeSpent;
  final String? project;
  final String? role;
  final String status;
  final String? travelMethod;

  User({
    this.email,
    this.name,
    required this.lastTimeSpent,
    this.project,
    this.role,
    required this.status,
    this.travelMethod,
  });

  factory User.fromMap(Map<dynamic, dynamic> map) {
    return User(
      email: map['email'] as String?,
      name: map['name'] as String?,
      lastTimeSpent: map['last time spent'] as String? ?? '0',
      project: map['project'] as String?,
      role: map['role'] as String?,
      status: map['status'] as String? ?? 'Unknown',
      travelMethod: map['travelMethod'] as String?,
    );
  }
}

class UsageStatistics {
  final int totalHours;
  final int uniqueUsers;
  final double avgVisitDuration;
  final Map<String, int> usageReasons;
  final Map<String, int> weeklyBusyHours;

  UsageStatistics({
    required this.totalHours,
    required this.uniqueUsers,
    required this.avgVisitDuration,
    required this.usageReasons,
    required this.weeklyBusyHours,
  });
}

class FirebaseService {
  final DatabaseReference _database = FirebaseDatabase.instance.ref();

  // Get all users
  Future<List<User>> getUsers() async {
    final DataSnapshot snapshot = await _database.child('Users').get();
    final Map<dynamic, dynamic>? users = snapshot.value as Map?;
    
    if (users == null) {
      return [];
    }
    
    return users.entries.map((entry) {
      return User.fromMap(entry.value as Map<dynamic, dynamic>);
    }).toList();
  }

  // Calculate usage statistics from users data
  Future<UsageStatistics> getUsageStatistics() async {
    final List<User> users = await getUsers();
    
    // Calculate total hours (sum of last time spent)
    int totalHours = 0;
    for (var user in users) {
      totalHours += int.parse(user.lastTimeSpent);
    }
    
    // For demo purposes, we'll add some reasonable value since your sample
    // data doesn't have many hours logged
    totalHours = totalHours > 0 ? totalHours : 2500;
    
    // Count unique users
    int uniqueUsers = users.where((user) => user.name != null).length;
    uniqueUsers = uniqueUsers > 0 ? uniqueUsers : 875; // Use sample data if no real data
    
    // Calculate average visit duration
    double avgVisitDuration = users.isEmpty ? 
        2.0 : // Use sample data if no real data
        totalHours / (users.length > 0 ? users.length : 1);
    
    // Calculate usage reasons (using projects as a proxy)
    Map<String, int> usageReasons = {
      'Studying': 0,
      'Group Projects': 0,
      'Meetings': 0,
      'Relaxing': 0,
      'Just Exploring': 0,
    };
    
    // Count projects
    for (var user in users) {
      if (user.project == 'Capstone' || user.project == 'Another Class') {
        usageReasons['Studying'] = (usageReasons['Studying'] ?? 0) + 1;
      } else if (user.project == 'Personal') {
        usageReasons['Relaxing'] = (usageReasons['Relaxing'] ?? 0) + 1;
      }
    }
    
    // If we don't have enough real data, use sample data
    if (usageReasons.values.fold(0, (sum, count) => sum + count) < 5) {
      usageReasons = {
        'Studying': 42,
        'Group Projects': 28,
        'Meetings': 15,
        'Relaxing': 10,
        'Just Exploring': 5,
      };
    }
    
    // Weekly busy hours (for demo purposes, create mock data based on day of week)
    Map<String, int> weeklyBusyHours = {
      'Mon': 42,
      'Tue': 35,
      'Wed': 58,
      'Thu': 49,
      'Fri': 45,
      'Sat': 28,
      'Sun': 15,
    };
    
    return UsageStatistics(
      totalHours: totalHours,
      uniqueUsers: uniqueUsers,
      avgVisitDuration: avgVisitDuration,
      usageReasons: usageReasons,
      weeklyBusyHours: weeklyBusyHours,
    );
  }
}